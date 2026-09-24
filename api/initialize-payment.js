const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed.",
    });
  }

  try {
    // --------------------------------------------------
    // 1. Verify the Firebase user
    // --------------------------------------------------

    const authorization = req.headers.authorization || "";

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const idToken = authorization.replace("Bearer ", "");

    let decodedToken;

    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid authentication token.",
      });
    }

    // --------------------------------------------------
    // 2. Get the order ID
    // --------------------------------------------------

    const { orderId } = req.body || {};

    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required.",
      });
    }

    // --------------------------------------------------
    // 3. Retrieve the order from Firestore
    // --------------------------------------------------

    const orderRef = db.collection("orders").doc(orderId);
    const orderSnapshot = await orderRef.get();

    if (!orderSnapshot.exists) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    const order = orderSnapshot.data();

    // --------------------------------------------------
    // 4. Make sure the order belongs to this user
    // --------------------------------------------------

    if (order.userId !== decodedToken.uid) {
      return res.status(403).json({
        message: "You are not authorized to pay for this order.",
      });
    }

    // --------------------------------------------------
    // 5. Validate the order
    // --------------------------------------------------

    if (!order.customer?.email) {
      return res.status(400).json({
        message: "Customer email is required.",
      });
    }

    if (!Number.isFinite(order.total) || order.total <= 0) {
      return res.status(400).json({
        message: "Invalid order total.",
      });
    }

    // --------------------------------------------------
    // 6. Make sure Paystack secret exists
    // --------------------------------------------------

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      console.error("PAYSTACK_SECRET_KEY is not configured.");

      return res.status(500).json({
        message: "Payment service is not configured.",
      });
    }

    // --------------------------------------------------
    // 7. Initialize Paystack transaction
    // --------------------------------------------------

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: order.customer.email,
          amount: Math.round(order.total * 100),
          currency: "NGN",
          metadata: {
            orderId,
            userId: order.userId,
          },
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error("Paystack initialization failed:", paystackData);

      return res.status(400).json({
        message:
          paystackData.message || "Unable to initialize payment.",
      });
    }

    // --------------------------------------------------
    // 8. Save payment information to the order
    // --------------------------------------------------

    await orderRef.update({
      paymentMethod: "Paystack",
      paymentStatus: "Pending",
      paymentReference: paystackData.data.reference,
    });

    // --------------------------------------------------
    // 9. Send payment information back to React
    // --------------------------------------------------

    return res.status(200).json({
      message: "Payment initialized successfully.",
      reference: paystackData.data.reference,
      accessCode: paystackData.data.access_code,
      authorizationUrl: paystackData.data.authorization_url,
    });
  } catch (error) {
    console.error("Initialize payment error:", error);

    return res.status(500).json({
      message: "Unable to initialize payment.",
    });
  }
};