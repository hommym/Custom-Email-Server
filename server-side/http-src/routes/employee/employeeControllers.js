const asyncHandler = require("express-async-handler");
const Employee = require("../../schemas/employeeSchema");
const Organisation = require("../../schemas/organisationSchema");
const bcrypt = require("bcrypt");
const { tObjectId } = require("../../libs/mongoose.js");


const employeeCountController = asyncHandler(async (req, res, next) => {
  if (!req.query.orgId) {
    return res.status(400).json({ error: "No data passed for the query orgId" });
  }

  const employees = await Employee.find({ orgId: tObjectId(req.query.orgId) }).select("-provider -verfCode -password -__v -isVerified");

  if (employees.length === 0) {
    return res.status(200).json({ employees: [] });
  }

  res.status(200).json({ employees, employeeCount: employees.length });
});

const employeeSignUpController = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  if (!(firstName || email || password || lastName || role)) {
    throw new Error("Some fields in the body are empty");
  }

  // checking if account already exist
  if (await Employee.findOne({ email: email })) {
    res.status(200);
    throw new Error("Account already exist");
  }

  if (!req.user.orgId) {
    return res.status(402).json({ message: "No Organisation present for employees to be added to" });
  }

  const userWithOrgDocumentAvailable = await req.user.populate("orgId");
  const { employeeCount, maxEmployeeCount } = userWithOrgDocumentAvailable.orgId;

  if (maxEmployeeCount) {
    if (employeeCount === maxEmployeeCount) {
      return res.status(402).json({ message: "You can't add anymore employees you limit has been reached" });
    }
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(process.env.DefaultPasswordEmployee, 10);

  // saving employee data in database
  const newEmployee = await Employeemployee.create({ firstName, lastName, email, role, password: hashedPassword, orgId: req.user.orgId });
  console.log("New employee saved in database");

  // updating number of employees
  await Organisation.updateOne({ _id: req.user.orgId }, { $set: { employeeCount: userWithOrgDocumentAvailable.orgId.employeeCount + 1 } });
  req.body.employee = newEmployee;
  console.log("Orgnisation employeeCont Updated");

  next();
});

const changeStatusController = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  if(!status){

   return res.status(400).json({message:"No data in status"})
  }
  const { employeeId } = req.params;
  const newEmployeeDoc = await Employee.findOneAndUpdate({ _id:tObjectId(employeeId) }, { $set: { status:status } });
 

  res.status(200).json({ message: "Status changed sucessfully",status:status });
});



module.exports = {
  employeeCountController,
  employeeSignUpController,
  changeStatusController,
};
