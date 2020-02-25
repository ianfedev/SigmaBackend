import { IGroup } from "../interfaces/IGroup";
import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const Group = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true
    },
    admin: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: false
    },
    permissions: {
      _id: false,
      user: {
        create: {
          type: Boolean,
          default: false
        },
        read: {
          type: Boolean,
          default: false
        },
        update: {
          type: Boolean,
          default: false
        },
        delete: {
          type: Boolean,
          default: false
        }
      },
      group: {
        create: {
          type: Boolean,
          default: false
        },
        read: {
          type: Boolean,
          default: false
        },
        update: {
          type: Boolean,
          default: false
        },
        assign: {
          type: Boolean,
          default: false
        },
        delete: {
          type: Boolean,
          default: false
        }
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model<IGroup & mongoose.Document>('Group', Group);
