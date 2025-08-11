import { storage } from "../storage";
import { Medicine, InsertMedicine } from "@shared/schema";
import fs from 'fs';
import path from 'path';

export class MedicineService {
  async searchMedicines(query: string, filters: any = {}) {
    return await storage.searchMedicines(query, filters);
  }

  async getMedicine(id: string) {
    return await storage.getMedicine(id);
  }

  async importUzPharmData(): Promise<void> {
    try {
      const dataPath = path.join(process.cwd(), 'attached_assets', 'uzpharm_all_medicines_1754894688748.json');
      
      if (!fs.existsSync(dataPath)) {
        console.error('UzPharm data file not found at:', dataPath);
        return;
      }

      const rawData = fs.readFileSync(dataPath, 'utf8');
      const medicinesData = JSON.parse(rawData);

      console.log(`Importing ${medicinesData.length} medicines from UzPharm registry...`);

      const processedMedicines: InsertMedicine[] = medicinesData.map((med: any) => ({
        dtRowId: med.DT_RowId,
        blankNum: med.blank_num,
        country: med.country,
        customer: med.customer,
        manufacturer: med.manufacturer,
        regNum: med.reg_num,
        series: med.series,
        certDate: med.sert_date,
        certOrg: med.sert_org,
        title: med.title,
        title2: med.title_2,
        year: med.year,
        // Extract additional info from title
        activeIngredient: this.extractActiveIngredient(med.title),
        dosage: this.extractDosage(med.title),
        form: this.extractForm(med.title),
        packaging: this.extractPackaging(med.title),
        price: null, // Will be set by pharmacies
        isAvailable: true,
      }));

      await storage.insertMedicines(processedMedicines);
      console.log('UzPharm data import completed successfully');
    } catch (error) {
      console.error('Error importing UzPharm data:', error);
      throw error;
    }
  }

  private extractActiveIngredient(title: string): string | undefined {
    // Extract active ingredient from medicine title
    const patterns = [
      /^([А-Яа-я\w\s]+?)\s+таблетки/i,
      /^([А-Яа-я\w\s]+?)\s+капсулы/i,
      /^([А-Яа-я\w\s]+?)\s+раствор/i,
      /^([А-Яа-я\w\s]+?)\s+суспензия/i,
      /^([А-Яа-я\w\s]+?)\s+мазь/i,
    ];

    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return undefined;
  }

  private extractDosage(title: string): string | undefined {
    const dosagePattern = /(\d+(?:\.\d+)?\s*(?:мг|г|мл|%|МЕ|ед))/i;
    const match = title.match(dosagePattern);
    return match ? match[1] : undefined;
  }

  private extractForm(title: string): string | undefined {
    const forms = ['таблетки', 'капсулы', 'раствор', 'суспензия', 'мазь', 'гель', 'крем', 'сироп', 'порошок'];
    
    for (const form of forms) {
      if (title.toLowerCase().includes(form)) {
        return form;
      }
    }

    return undefined;
  }

  private extractPackaging(title: string): string | undefined {
    const packagingPattern = /№(\d+)|(\d+\s*(?:мл|г|шт))/i;
    const match = title.match(packagingPattern);
    return match ? match[0] : undefined;
  }

  async getPopularMedicines(limit: number = 10): Promise<Medicine[]> {
    // This would typically be based on order frequency
    // For now, return a basic query
    return await storage.searchMedicines('', { limit });
  }

  async checkAvailability(medicineIds: string[]): Promise<any[]> {
    const medicines = await storage.getMedicinesByIds(medicineIds);
    
    return medicines.map(medicine => ({
      id: medicine.id,
      title: medicine.title,
      isAvailable: medicine.isAvailable,
      // Add pharmacy availability check here
    }));
  }
}

export const medicineService = new MedicineService();
