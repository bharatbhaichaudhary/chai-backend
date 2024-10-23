import mongoose, {Schema, model} from 'mongoose'

const tweetSchema =new Schema({
    content:{type:String, required:true},
    owner:{type: Schema.Types.ObjectId, ref:'User'},
},{timestampa:true})

export const Tweet = model("Tweet", tweetSchema)