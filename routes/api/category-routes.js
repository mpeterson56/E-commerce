const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/category', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const sql = `SELECT * FROM category`;

    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });


router.get('/category/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const sql = `SELECT * FROM category WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });


});

router.post('/category', (req, res) => {
  // create a new category
Category.create({
  category_name: req.body.category_name,
})
.then(dbCategoryData => {
  res.json(dbCategoryData)
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.put('/category/:id', (req, res) => {
  // update a category by its `id` value
 Category.update(req.body, {
  individualHooks:true,
  where:{
    id:req.params.id
  }
 })


});

router.delete('/category/:id', (req, res) => {
  // delete a category by its `id` value
 const sql = `DELETE FROM category WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'category not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });


});

module.exports = router;
