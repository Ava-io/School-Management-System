// import { checkRole } from "../../middleware/checkRole.js";
// import { Router } from "express";
// import {
//   createAnnouncementService,
//   delAnnById,
//   editAnnById,
//   getAnnById,
//   getAnnouncements,
// } from "../../Services/announcementService.js";
// import { verifyToken } from "../../middleware/verifyToken.js";

// const router = Router();

// router.post(
//   "/create-announcement",
//   verifyToken,
//   checkRole(["admin", "teacher"]),
//   createAnnouncementService,
// );
// router.get(
//   "/get-announcements",
//   verifyToken,
//   checkRole(["admin", "teacher"]),
//   getAnnouncements,
// );
// router.get(
//   "/getAnnById/:id",
//   verifyToken,
//   checkRole("admin", "teacher"),
//   getAnnById,
// );
// router.patch(
//   "/editAnnById/:id",
//   verifyToken,
//   checkRole(["admin", "teacher"]),
//   editAnnById,
// );
// router.delete(
//   "/delAnnById/:id",
//   verifyToken,
//   checkRole(["admin", "teacher"]),
//   delAnnById,
// );


// export default router;
