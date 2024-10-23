import mongoose, {Schema, model} from 'mongoose'

const playlistSchema = new Schema({
    name:{ytpe:String, required:true},
    description:{ytpe:String, required:true},
    video:{{type: Schema.Types.ObjectId, ref:'Video'}},
    owner:{type: Schema.Types.ObjectId, ref:'User'},
},{timestampa:true})

export const Playlist = model("Playlist",playlistSchema )