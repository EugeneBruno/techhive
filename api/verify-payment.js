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
    // 2. Get the payment reference
    // --------------------------------------------------

    const { reference } = req.body || {};

    if (!reference) {
      return res.status(400).json({
        message: "Payment reference is required.",
      });
    }

    // --------------------------------------------------
    // 3. Get Paystack secret key
    // --------------------------------------------------

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      console.error("PAYSTACK_SECRET_KEY is not configured.");

      return res.status(500).json({
        message: "Payment service is not configured.",
      });
    }

    // --------------------------------------------------
    // 4. Verify transaction with Paystack
    // --------------------------------------------------

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error("Paystack verification failed:", paystackData);

      return res.status(400).json({
        message:
          paystackData.message || "Unable to verify payment.",
      });
    }

    const transaction = paystackData.data;

    // --------------------------------------------------
    // 5. Make sure the payment was actually successful
    // --------------------------------------------------

    if (transaction.status !== "success") {
      return res.status(400).json({
        message: "Payment was not successful.",
        paymentStatus: transaction.status,
      });
    }

    // --------------------------------------------------
    // 6. Find the order using Paystack metadata
    // --------------------------------------------------

    const orderId = transaction.metadata?.orderId;

    if (!orderId) {
      return res.status(400).json({
        message: "Payment is missing the order reference.",
      });
    }

    const orderRef = db.collection("orders").doc(orderId);
    const orderSnapshot = await orderRef.get();

    if (!orderSnapshot.exists) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    const order = orderSnapshot.data();

    // --------------------------------------------------
    // 7. Make sure the order belongs to this user
    // --------------------------------------------------

    if (order.userId !== decodedToken.uid) {
      return res.status(403).json({
        message: "You are not authorized to verify this order.",
      });
    }

    // --------------------------------------------------
    // 8. Verify the amount
    // --------------------------------------------------

    const expectedAmount = Math.round(order.total * 100);

    if (transaction.amount !== expectedAmount) {
      console.error("Payment amount mismatch:", {
        expectedAmount,
        receivedAmount: transaction.amount,
        orderId,
      });

      return res.status(400).json({
        message: "Payment amount does not match the order.",
      });
    }

    // --------------------------------------------------
    // 9. Update the order
    // --------------------------------------------------

    await orderRef.update({
      paymentMethod: "Paystack",
      paymentStatus: "Paid",
      paymentReference: transaction.reference,
      paymentChannel: transaction.channel || null,
      paidAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "Pending",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // --------------------------------------------------
    // 10. Return successful verification
    // --------------------------------------------------

    return res.status(200).json({
      message: "Payment verified successfully.",
      paymentStatus: "Paid",
      orderId,
      reference: transaction.reference,
    });
  } catch (error) {
    console.error("Verify payment error:", error);

    return res.status(500).json({
      message: "Unable to verify payment.",
    });
  }
};