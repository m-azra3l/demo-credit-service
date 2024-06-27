// Define a base entity interface with common properties for other interfaces to extend
export interface BaseEntity {    
    id: number; // Unique identifier for the entity
    createdAt: Date; // Timestamp when the entity was created
    updatedAt: Date; // Timestamp when the entity was last updated
    deleted: boolean; // Boolean flag indicating if the entity is deleted
}
