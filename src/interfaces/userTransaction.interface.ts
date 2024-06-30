/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the user
 *           example: 1
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: Jane Doe
 *         account_number:
 *           type: string
 *           description: Account number of the user
 *           example: "9678758461"
 *         email:
 *           type: string
 *           description: Email of the user
 *           example: "jane.doe@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was created
 *           example: "2024-06-29T16:32:38.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was last updated
 *           example: "2024-06-29T16:32:38.000Z"
 *         deleted:
 *           type: boolean
 *           description: Whether the user is deleted
 *           example: false
 *     UserTransaction:
 *       type: object
 *       required:
 *         - id
 *         - amount
 *         - userId
 *         - type
 *         - status
 *         - direction
 *         - createdAt
 *         - updatedAt
 *         - deleted
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the transaction
 *           example: 1
 *         amount:
 *           type: number
 *           format: double
 *           description: Amount involved in the transaction
 *           example: 100.00
 *         userId:
 *           type: integer
 *           description: ID of the user who made the transaction
 *           example: 1
 *         type:
 *           type: string
 *           description: Type of transaction (e.g., fund, transfer, withdraw)
 *           example: "fund"
 *         status:
 *           type: string
 *           description: Status of the transaction (e.g., pending, successful, failed)
 *           example: "pending"
 *         direction:
 *           type: string
 *           description: Direction of the transaction (e.g., credit, debit)
 *           example: "credit"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the transaction was created
 *           example: "2024-06-29T16:32:49.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the transaction was last updated
 *           example: "2024-06-29T16:32:49.000Z"
 *         deleted:
 *           type: boolean
 *           description: Whether the transaction is deleted
 *           example: false
 *         source:
 *           $ref: '#/components/schemas/Transaction'
 *         destination:
 *           $ref: '#/components/schemas/Transaction'
 */
// Import the Base Entity interface
import { BaseEntity } from "./baseEntity.interface";

// Define a User Transaction interface extending the Base Entity interface
export interface UserTransactionInterface extends BaseEntity {
    amount: number; // Amount involved in the transaction
    userId: number; // ID of the user who made the transaction
    type: string; // Type of transaction (e.g., credit, debit)
    status: string; // Status of the transaction (e.g., pending, completed)
    direction: string; // Direction of the transaction (e.g., inbound, outbound)
}