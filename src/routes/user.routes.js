import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changeCurrentPassword,
  updateAccountDetails,
  updateUSerAvatar,
  updateUSerCoverImage,
  getUserChannelProfile,
  getWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.midedleware.js";
const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
// 

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken)
router.route("/chane-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/cupdate-account").patch(verifyJWT, updateAccountDetails)

router.route('/avatar').patch(verifyJWT,upload.single('avatar'), updateUSerAvatar )
router.route('/cover-image').patch(verifyJWT,upload.single('coverImage'), updateUSerCoverImage )

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/histiry").get(verifyJWT, getWatchHistory)
export default router;
