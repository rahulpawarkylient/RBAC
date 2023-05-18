import CustomerModel from "../models/customerModel.js";

// ADD CUSTOMER
export const addCustomer = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, address } = req.body;
    // const image = req.file.path; // or req.file.buffer depending on how the image data is being sent
    const newCustomer = new CustomerModel({
      // image,
      firstname,
      lastname,
      email,
      phone,
      address,
    });
    await newCustomer.save();
    res.status(201).json({ message: "Customer added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error." });
  }
};

//GET CUSTOMERS
export const getCustomer = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.query;
    let query = {};

    if (firstname) {
      query.firstname = { $regex: firstname, $options: "i" };
    }
    if (lastname) {
      query.lastname = { $regex: lastname, $options: "i" };
    }

    if (email) {
      query.email = { $regex: email, $options: "i" };
    }

    const customers = await CustomerModel.find(query);
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error." });
  }
};
// export const getCustomer = async (req, res) => {
//   try {
//     const customers = await CustomerModel.find();
//     res.status(200).json(customers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Internal server error." });
//   }
// };

// GET CUSTOMER BY ID
export const getByIdCustomer = async (req, res) => {
  const customerId = req.params.id; // get the customer ID from the request parameters
  try {
    const customerData = await CustomerModel.findById(customerId); // find the customer by ID
    if (!customerData) {
      // if customer is not found
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customerData); // send the customer data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// UPDATE CUSTOMERS
export const editCustomer = async (req, res) => {
  const customerId = req.params.id; // get the customer ID from the request parameters
  const { firstname, lastname, email, phone, address } = req.body; // get the updated customer data from the request body
  try {
    let image;
    if (req.file) {
      image = req.file.path; // or req.file.buffer depending on how the image data is being sent
    }
    const customertData = await CustomerModel.findByIdAndUpdate(
      customerId,
      { image, firstname, lastname, email, phone, address },
      { new: true } // set { new: true } option to return the updated document
    ); // find and update the customer by ID
    if (!customertData) {
      // if customer is not found
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({message: 'Customer detail updated successfull',customertData}); // send the updated customer data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// DELETE CUSTOMERS
export const deleteCustomer = async (req, res) => {
  const customerId = req.params.id; // get the customer ID from the request parameters
  try {
    const customerData = await CustomerModel.findByIdAndDelete(customerId); // find and delete the customer by ID
    if (!customerData) {
      // if customer is not found
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" }); // send success message
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
