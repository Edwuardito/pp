const { Router } = require("express");
const router = Router();
const { createCategory, getCategory, removeCategory, editCategory } = require("../controllers/category");
const { createProduct, getProduct, removeProduct, editProduct } = require("../controllers/product");
const { createUser, getUser, editUser, removeUser, loginUser } = require("../controllers/user");

router.post("/category",createCategory);
router.get("/category",getCategory);
router.delete("/category/:id",removeCategory);
router.patch("/category/:id",editCategory);

router.post("/product",createProduct);
router.get("/product",getProduct);
router.delete("/product/:id",removeProduct);
router.patch("/product/:id",editProduct);

router.post("/user",createUser);
router.post("/user/login",loginUser)
router.get("/user",getUser);
router.delete("/user/:id",removeUser);
router.patch("/user/:id",editUser);

module.exports = router;
