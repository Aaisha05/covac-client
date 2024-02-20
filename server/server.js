const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
require('dotenv').config(); //spelling crrct dana
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "emp_login"
});

// SIGNUP
app.post('/signup', (req, res) => {
  const sql = "INSERT INTO users(`username`, `email`, `password`) VALUES(?)";
  const values = [
    req.body.username,
    req.body.email,
    req.body.password,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// LOGIN
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [req.body.email, req.body.password];
  db.query(sql, values, (err, results) => {
    if (err) {
      return res.json(err);
    }
    if (results.length > 0) {
      const user = results[0];     
      if (user.email === 'root@gmail.com' && user.password === 'root') {
        return res.json({ message: 'Login successful', redirect: '/admin/dashboard' });
      } else {
        return res.json({ message: 'Login successful', redirect: '/users/dashboard' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

//SLOTS - create
app.post('/slots', (req, res) => {
  const sql = "INSERT INTO slots(`slot_id`, `slot_name`, `location`,`capacity`,`start_time`,`end_time`) VALUES(?)";
  const values = [
    req.body.slotid,
    req.body.slotname,
    req.body.location,
    req.body.capacity,
    req.body.starttime,
    req.body.endtime,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({data:"okay"}); //if data is posted i need to givce a messge to understand
  });
});

//SLOTS- read
app.get('/slots', (req, res) => {
  const sql = "SELECT * FROM slots";

  db.query(sql, (err, results) => {
    if (err) {
      return res.json(err);
    }

    console.log(results); // Log the results to the console
    return res.json(results);
  });
});

//  SLOTS - delete
app.delete('/slots/:slotId', (req, res) => {
  const slotId = req.params.slotId;
  const sql = "DELETE FROM slots WHERE `slot_id`=?";

  db.query(sql, [slotId], (err, data) => {
    if (err) return res.json(err);

    if (data.affectedRows === 0) {
      return res.json({ message: 'Slot not found' });
    }

    return res.json({ message: 'Slot deleted successfully' });
  });
});


//SLOTS - update
app.put('/slots/:slotId', (req, res) => {
  const slotId = req.params.slotId;
  const sql = "UPDATE slots SET `slot_name`=?, `location`=?, `capacity`=?, `start_time`=?, `end_time`=? WHERE `slot_id`=?";

  const values = [
    req.body.slotname,
    req.body.location,
    req.body.capacity,
    req.body.starttime,
    req.body.endtime,
    slotId,
  ];

  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);

    if (data.affectedRows === 0) {
      return res.json({ message: 'Slot not found' });
    }

    return res.json({ message: 'Slot updated successfully' });
  });
});


//USERS -slot
app.get('/user/slots', (req, res) => {
  const sql = "SELECT * FROM slots";

  db.query(sql, (err, results) => {
    if (err) {
      return res.json(err);
    }

    return res.json(results);
  });
});

// USERS - slot (update capacity)
app.route('/user/slots')
  .get((req, res) => {
    const sql = "SELECT * FROM slots";
    db.query(sql, (err, results) => {
      if (err) {
        return res.json(err);
      }
      return res.json(results);
    });
  })
  .post((req, res) => {
    const { slotId } = req.body;

    // Check if the slotId is provided
    if (!slotId) {
      return res.status(400).json({ message: 'Slot ID is required' });
    }

    // Check if the slot with the given ID exists
    const sql = "SELECT * FROM slots WHERE `slot_id`=?";
    db.query(sql, [slotId], (queryErr, slots) => {
      if (queryErr) {
        return res.json(queryErr);
      }

      if (slots.length === 0) {
        return res.status(404).json({ message: 'Slot not found' });
      }

      // Check if the capacity is greater than 0
      const slot = slots[0];
      if (slot.capacity > 0) {
        // Update the capacity
        const updatedCapacity = slot.capacity - 1;
        const updateSql = "UPDATE slots SET `capacity`=? WHERE `slot_id`=?";
        const updateValues = [updatedCapacity, slotId];

        db.query(updateSql, updateValues, (updateErr, updateData) => {
          if (updateErr) {
            return res.json(updateErr);
          }

          // Return the updated slot details after the booking
          const newSql = "SELECT * FROM slots";
          db.query(newSql, (newErr, newResults) => {
            if (newErr) {
              return res.json(newErr);
            }
            return res.json(newResults);
          });
        });
      } else {
        return res.status(400).json({ message: 'Slot is already full' });
      }
    });
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening");
});