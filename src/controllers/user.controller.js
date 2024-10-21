import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  // get user details from body
  // validation - not empty
  // chack if user already exists: username email
  // chack for images, chack for avtar
  // upload them to cloudinary, avatar
  // create user object - creat entry in db
  // remove password and refresh token field form response
  // chack for  user creation
  // return res

  const { username, email, fullname, password } = req.body;

  if (
    [fullname, email, password, username].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = user.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exista");
  }

  const avatarLocalPath = req.files?.avatar[0]?.paath;
  const coverImageLocalPath = req.files?.coverImage[0]?.paath;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar fileis required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar fileis required");
  }

  const user = await User.creat({
    fullname,
    email,
    password,
    username: username.toLowerCase,
    avatar : avatar.url,
    coverImage: coverImage?.url || ''
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, 'Something went wrong while registering the user')
  }

  return res.status(201).json{
    new ApiResponse(201, createdUser, "User register is successfuly")
  }

});

export { registerUser };
