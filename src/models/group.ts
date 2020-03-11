import { IGroup } from "../interfaces/IGroup";
import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { mongoosePagination } from "ts-mongoose-pagination";

const Group = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true
    },
    admin: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: false,
      autopopulate: true
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

Group.plugin(mongoosePagination);
Group.plugin(require('mongoose-autopopulate'));
export default mongoose.model<IGroup & mongoose.Document>('Group', Group);
