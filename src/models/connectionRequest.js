const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: ObjectId,
      required: true,
    },
    toUserId: {
      type: ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrected status type`,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ firstName: 1, lastName: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot sent connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
