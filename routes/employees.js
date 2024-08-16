const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new employee
router.post('/employees', async (req, res) => {
  const employee = new Employee(req.body);
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/employees/:id', async (req, res) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json({ message: "Employee deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
router.put('/employees/:id', async (req, res) => {
    try {
      const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  // Add a new salary record to an employee's salary history
router.post('/employees/:id/salary', async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      const newSalary = {
        year: req.body.year,
        month: req.body.month,
        salaryState: req.body.salaryState,
        isLocked: req.body.isLocked || false,
        baseSalary: req.body.baseSalary,
        marriageAllowance: req.body.marriageAllowance,
        transportAllowance: req.body.transportAllowance,
        serviceYearsAllowance: req.body.serviceYearsAllowance,
        educationAllowance: req.body.educationAllowance,
        bonuses: req.body.bonuses,
        otherAllowances: req.body.otherAllowances,
        totalAllowances: req.body.totalAllowances,
        socialSecurity: req.body.socialSecurity,
        absence: req.body.absence,
        absenceDays: req.body.absenceDays,
        salaryPaidDate: req.body.salaryPaidDate,
        lateHours: req.body.lateHours,
        lateHoursDeduction: req.body.lateHoursDeduction,
        loan: req.body.loan,
        otherDeductions: req.body.otherDeductions,
        totalDeductions: req.body.totalDeductions,
        vacationDays: req.body.vacationDays,
        vacationDaysDeduction: req.body.vacationDaysDeduction,
        netSalary: req.body.netSalary,
        notes: req.body.notes,
      };
  
      employee.salaryHistory.push(newSalary); // إضافة الراتب الجديد إلى سجل الرواتب
      await employee.save(); // حفظ التعديلات
  
      res.status(201).json({ message: "Salary added successfully", salary: newSalary });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
