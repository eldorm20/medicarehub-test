import { medicineService } from "./services/medicineService";

// This script can be run to seed the database with UzPharm medicine data
async function seedMedicines() {
  try {
    console.log('Starting medicine data import from UzPharm registry...');
    await medicineService.importUzPharmData();
    console.log('Medicine data import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to import medicine data:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seedMedicines();
}

export { seedMedicines };
