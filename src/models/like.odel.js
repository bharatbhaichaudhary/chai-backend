import mongoose, {Schema, model} from 'mongoose'

const likeShema = new Schema({
    video:{type:Schema.Types.ObjectId, ref:"Video"},
    comment:{type:Schema.Types.ObjectId, ref:"Comment"},
    tweet:{type:Schema.Types.ObjectId, ref:"Tweet"},
    likeBy:{type:Schema.Types.ObjectId, ref:"User"},
},{timestamps:true})

export const Like = model("Like", likeShema)