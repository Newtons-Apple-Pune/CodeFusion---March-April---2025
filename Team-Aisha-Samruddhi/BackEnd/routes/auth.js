const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const Teacher = require('../models/TeacherLogin');
const path = require('path');
const multer = require('multer');
const contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const register = require('../models/register');
const Event = require('../models/Calendar');


const JWT_SECRET = 'RahberLifeS@ver';

//Route 1: add student using: post "/api/auth/createstudent"
router.post('/createstudent', [
    body('LoginID', 'Enter a valid LoginID').isLength({ min: 3 }),
    body('EmailID', 'Enter a valid EmailID').isEmail(),
    body('Password', 'Enter a valid password').isLength({ min: 3 })
], async (req, res) => {
    let success = false;
    // if there are errors, return bad req n errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        //check whether the user with this ID exist already
        let user = await User.findOne({ LoginID: req.body.LoginID });
        if (user) {
            return res.status(400).json({ success, error: "Sorry the user with this LoginID already exist!! " })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.Password, salt);

        //create a new user
        user = User.create({
            Name: req.body.Name,
            Gender: req.body.Gender,
            Class: req.body.Class,
            EmailID: req.body.EmailID,
            DOB: req.body.DOB,
            Address: req.body.Address,
            Contact: req.body.Contact,
            FName: req.body.FName,
            MName: req.body.MName,
            FContact: req.body.FContact,
            MContact: req.body.MContact,
            LoginID: req.body.LoginID,
            Password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

        //res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})

//Route 2: fetch students data: post "/api/auth/studentdata"
router.get('/studentdata', async (req, res) => {
    try {
        // Fetch all data from the database, excluding the password and father/mother contact fields
        const allData = await User.find({}, { Password: 0, FName: 0, Gender: 0, DOB: 0, MName: 0, MContact: 0 });

        // Send the data as JSON response
        res.json({ success: true, data: allData });
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route 3: delete a student by ID
router.delete('/student/:id', async (req, res) => {
    try {
        // Find the registration request by ID and delete it
        const deletedRequest = await User.findByIdAndDelete(req.params.id);

        // If the  student was not found
        if (!deletedRequest) {
            return res.status(404).json({ success: false, error: 'Student not found' });
        }

        // If the registration request was successfully deleted
        return res.json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


//Route 4: add teacher in db using: post "/api/auth/createteacher"
router.post('/createteacher', [
    body('Name', 'Name is required').notEmpty(),
    body('Gender', 'Gender is required').notEmpty(),
    body('Education', 'Qualification is required').notEmpty(),
    body('EmailID', 'Enter a valid Email Address').isEmail(),
    body('JoinDate', 'Join Date is required').notEmpty(),
    body('Address', 'Address is required').notEmpty(),
    body('Contact', 'Enter a valid Mobile Number').isMobilePhone('en-IN'),
    body('AlternateContact').optional().isMobilePhone('en-IN'),
    body('LoginID', 'Enter a valid LoginID').isLength({ min: 3 }),
    body('Password', 'Password must be at least 3 characters long').isLength({ min: 3 })
], async (req, res) => {
    let success = false;
    // if there are errors, return bad req n errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        //check whether the teacher with this ID exist already
        let teacher = await Teacher.findOne({ LoginID: req.body.LoginID });
        if (teacher) {
            return res.status(400).json({ success, msg: "Sorry, a teacher with this LoginID already exists." })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.Password, salt);

        //create a new teacher
        teacher = await Teacher.create({
            Name: req.body.Name,
            Gender: req.body.Gender,
            Education: req.body.Education,
            EmailID: req.body.EmailID,
            JoinDate: req.body.JoinDate,
            Address: req.body.Address,
            Contact: req.body.Contact,
            AlternateContact: req.body.AlternateContact,
            LoginID: req.body.LoginID,
            Password: secPass
        });
        const data = {
            user: {
                id: teacher.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred")
    }
})


//Route 5: fetch teachers data: post "/api/auth/teacherdata"
router.get('/teacherdata', async (req, res) => {
    try {
        // Fetch all data from the database, excluding the password 
        const allData = await Teacher.find({}, { Password: 0});

        // Send the data as JSON response
        res.json({ success: true, data: allData });
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route 6: delete a teacher by ID
router.delete('/teacher/:id', async (req, res) => {
    try {
        // Find the registration request by ID and delete it
        const deletedRequest = await Teacher.findByIdAndDelete(req.params.id);

        // If the  teacher was not found
        if (!deletedRequest) {
            return res.status(404).json({ success: false, error: 'teacher not found' });
        }

        // If the registration request was successfully deleted
        return res.json({ success: true, message: 'Teacher deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route 6: Authenticate a user (student or teacher): POST "/api/auth/login"
router.post('/login', [
    body('LoginID', 'Enter a valid LoginID').isLength({ min: 3 }),
    body('Password', 'Enter a valid password').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { LoginID, Password } = req.body;

    try {
        let user = await User.findOne({ LoginID });
        let userType = "student";

        if (!user) {
            user = await Teacher.findOne({ LoginID });
            userType = "teacher";
        }

        if (!user) {
            return res.status(400).json({ success, error: "Invalid LoginID" });
        }

        const passwordCompare = await bcrypt.compare(Password, user.Password);

        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Invalid password" });
        }

        const data = {
            user: {
                id: user.id,
                LoginID: user.LoginID,
                userType: userType,
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken, user: data.user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



// Route 7: Get logged in user details using : POST "/api/auth/getuser" login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;

        // Check if the user is a student
        let user = await User.findById(userId).select("-Password");
        let userType = "student";

        // If not a student, check if the user is a teacher
        if (!user) {
            user = await Teacher.findById(userId).select("-Password");
            userType = "teacher";
        }

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Depending on the userType, you can handle the response accordingly
        // For example, you can include userType in the response
        res.json({ user: user, userType: userType });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route 8: add contact us message in db using: post "/api/auth/contact"
router.post('/contact', [
    body('Name', 'Enter a valid NAME').isLength({ min: 3 }),
    body('EmailID', 'Enter a valid EmailID').isEmail(),
    body('Message', 'Enter a valid Message').isLength({ min: 3 })
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        // Create contact and wait for it to finish
        const Contact = await contact.create({
            Name: req.body.Name,
            EmailID: req.body.EmailID,
            Message: req.body.Message
        });

        // Conditionally send email if contact creation was successful
        if (Contact) {
            // Create Nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'rahberinfo@gmail.com',
                    pass: 'xaft zuqa xjmk chyi',
                },
            });

            // Define email options
            const mailOptions = {
                from: 'rahberinfo@gmail.com',
                to: Contact.EmailID,
                subject: 'RAHBER: Inquiry Submitted - Expect Contact Soon',
                text: `Dear Student,\n\nThank you for reaching out to us via the contact form.\n We have received your inquiry, and we want to assure you that our administrative team will address your question promptly.\n You can expect to receive a response from us as soon as possible.\n We will be contacting you using the email address you provided.\n\nIf you have any further questions or concerns in the meantime, feel free to reach out to us directly at Rahberinfo@gmail.com or call on 9833647264.\n\nThank you for your patience and understanding.\n\nBest regards,\n\nAbdullah Shaikh\nAdmin of Classes\nRAHBER`
            };

            try {
                // Send email
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
                return res.json({ success: true, message: 'Email sent successfully' });
            } catch (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ success: false, error: 'Error sending email' });
            }
        }

        // Send response after contact creation
        return res.json({ success: true, data: Contact });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: 'Some Error Occurred' });
    }
});


//Route 9: fetch contact us data: post "/api/auth/contactusdata"
router.get('/contactdata', async (req, res) => {
    try {
        // Fetch all data from the database
        const allData = await contact.find({}); // Use your Mongoose model to find all documents

        // Send the data as JSON response
        res.json({ success: true, data: allData });
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route 10: delete a contact us quiry by ID
router.delete('/contact/:id', async (req, res) => {
    try {
        // Find the registration request by ID and delete it
        const deletedRequest = await contact.findByIdAndDelete(req.params.id);

        // If the registration request was not found
        if (!deletedRequest) {
            return res.status(404).json({ success: false, error: 'request not found' });
        }

        // If the registration request was successfully deleted
        return res.json({ success: true, message: 'request deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


//Route 11: add registration of demo in db using: post "/api/auth/register"
router.post('/register', [
    body('Name', 'Enter a valid NAME').isLength({ min: 3 }),
    body('EmailID', 'Enter a valid EmailID').isEmail()
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        // Create contact and wait for it to finish
        const Register = await register.create({
            Name: req.body.Name,
            EmailID: req.body.EmailID,
            Class: req.body.Class,
            Course: req.body.Course,
            Contact: req.body.Contact,
            Percentage: req.body.Percentage,
            Institute: req.body.Institute,
        });
        // Conditionally send email if contact creation was successful
        if (Register) {
            // Create Nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'rahberinfo@gmail.com',
                    pass: 'xaft zuqa xjmk chyi',
                },
            });

            // Define email options
            const mailOptions = {
                from: 'rahberinfo@gmail.com',
                to: Register.EmailID,
                subject: 'RAHBER: Confirmation of Demo Lecture Request',
                text: `Dear Student,\n\nThank you for reaching out to us regarding your interest in attending our demo lecture. We appreciate your enthusiasm for our classes.\n\nWe have received your request, and our team is currently processing it. Our administrative staff will review your request and get back to you shortly with the details of the scheduled demo lecture.\n\nPlease note that the selection of students for the demo lecture will be based on the availability of seats. We will do our best to accommodate you at the earliest possible time.\n\nOnce your demo lecture is scheduled, we will notify you through the email address you provided during registration. Additionally, if you have provided a contact number, we may also reach out to you via phone.\n\nIf you have any urgent questions or concerns, feel free to reach out to us at Rahberinfo@gmail.com or call on 9833647264.\n\nWe appreciate your interest in our classes and look forward to welcoming you to our demo lecture.\n\n\nBest regards,\n\nAbdullah Shaikh\nAdmin of Classes\nRAHBER`
            };

            try {
                // Send email
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
                return res.json({ success: true, message: 'Email sent successfully' });
            } catch (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ success: false, error: 'Error sending email' });
            }
        }

        // Send response after contact creation
        return res.json({ success: true, data: Contact });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: 'Some Error Occurred' });
    }
});

//Route 12: fetch register data: post "/api/auth/registerdata"
router.get('/registerdata', async (req, res) => {
    try {
        // Fetch all data from the database
        const allData = await register.find({}); // Use your Mongoose model to find all documents

        // Send the data as JSON response
        res.json({ success: true, data: allData });
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route 13: delete a registration request by ID
router.delete('/register/:id', async (req, res) => {
    try {
        // Find the registration request by ID and delete it
        const deletedRequest = await register.findByIdAndDelete(req.params.id);

        // If the registration request was not found
        if (!deletedRequest) {
            return res.status(404).json({ success: false, error: 'Registration request not found' });
        }

        // If the registration request was successfully deleted
        return res.json({ success: true, message: 'Registration request deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

//Route 14: calendar events
router.post('/calendar', async (req, res) => {
    const event = new Event({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      EventType:req.body.EventType,
      EventLocation:req.body.EventLocation
    });
  
    try {
      const newEvent = await event.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  router.get('/calendar', async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  //Route 15: Delete an event by ID
router.delete('/calendar/:id', async (req, res) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  //route 16: Update an event by ID
  router.put('/calendar/:id', async (req, res) => {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(updatedEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
module.exports = router;
