const validateRegistration=(req, res, next) =>{
    const { firstname, lastname, address, contactNumber, email, password } = req.body;
  
    // Check if required fields are present
    if (!firstname || !lastname ) {
      return res.status(400).json({ error: 'Missing firstname/lastname.' });
    }

    if (!address ) {
        return res.status(400).json({ error: 'Missing address.' });
      }
    
      if (!password ) {
        return res.status(400).json({ error: 'Missing password.' });
      }
      
       // Validate contactNumber
    if (typeof contactNumber !== 'number' || !Number.isInteger(contactNumber) ) {
        return res.status(400).json({ error: 'Contact number must be an INTEGER.' });
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' }); // Invalid format
    }
  
    // Additional validation rules
    if (email.length < 5 || email.length > 255) {
        return res.status(400).json({ error: 'Check Length cof email.' }); // Length check
    }
  
   // Check for consecutive special characters (including '/')
    if (/[\._-]{2,}|\/(?!\.)/.test(email)) {
        return res.status(400).json({ error: 'Consecutive special characters.' }); // Consecutive special characters
    }
        
    next();
  }
  
  module.exports = validateRegistration;
  