import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, { message: "Please enter your email address or username" }),
	password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
});


export const registerSchema = z.object({
	firstname: z.string().min(1, { message: "Please enter your firstname" }).min(3, { message: 'First name should not be less than 3 characters' }),
	lastname: z.string().min(1, { message: "Please enter your lastname" }).min(3, { message: 'Last name should not be less than 3 characters' }),
	email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
	password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Passwords must be at least 8 characters in length' }),
});

export const forgotPasswordSchema = z.object({
	userData: z.string().min(1, { message: "Please enter your email address" }),
});

export const resetPasswordSchema = z.object({
	email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
});

export const setPasswordSchema = z.object({
	password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
	confirmpassword: z.string().min(1, { message: "Please enter your confirmation password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
});

export const contactSchema = z.object({
	name: z.string().min(1, { message: "Please enter your name" }).min(3, { message: 'Name should not be less than 3 characters' }),
	email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
	type: z.string().min(1, { message: "Please enter select the type of question" }),
	message: z.string().min(1, { message: "Please enter your message" }).min(25, { message: "Message must be at least 25 characters" }),
});

export const changePasswordSchema = z.object({
	oldpassword: z.string().min(1, { message: "Please enter your current password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
	newpassword: z.string().min(1, { message: "Please create a new password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
	confirmpassword: z.string().min(1, { message: "Please confirm your new password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
})

export const withdrawThroughBTCSchema = z.object({
	address: z.string().min(1, { message: "Please enter your BTC address to receive funds" }).min(10, { message: "Please enter a valid withdrawal account number/address" }),
	amount: z.string().min(1, { message: "Please enter an amount to withdraw" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid amount for withdrawal' }),
	login: z.string(),
	password: z.string()
});
export const withdrawThroughBankTransferSchema = z.object({
	accountNumber: z.string(),
	accountName: z.string(),
	tag: z.string(),
	amount: z.string().min(1, { message: "Please enter an amount to withdraw" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid amount for withdrawal' }),
	login: z.string(),
	password: z.string()
});
export const depositSchema = z.object({
	amount: z.string().min(1, { message: "Please enter an amount for deposit" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid amount for deposit' }),
	txnId: z.string().min(1, { message: "Please enter the transactionId." })
});
export const tradeSchema = z.object({
	amount: z.string().min(1, { message: "Please enter an amount to use for trade" }).regex(/^\d+(\.\d+)?$/, { message: 'Please enter a valid amount for trade' }),
	type: z.string().min(1, { message: "Please select a package type." })
});
export const updateProfileSchema = z.object({
	firstname: z.string().min(1, { message: "Please enter your firstname" }).min(3, { message: 'Firstname should not be less than 3 characters' }),
	lastname: z.string().min(1, { message: "Please enter your firstname" }).min(3, { message: 'Firstname should not be less than 3 characters' }),
});



