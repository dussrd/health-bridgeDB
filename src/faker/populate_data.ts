// src/faker/faker.ts
// -------------------------------------------------------------
// Generador de datos falsos para los modelos del proyecto.
// Ejecuta: npx ts-node src/faker/faker.ts
// Requiere: npm i @faker-js/faker
// -------------------------------------------------------------
import { faker } from "@faker-js/faker";
import type { Model, ModelStatic } from "sequelize";
import { sequelize } from "../database/db";

// Importar modelos (rutas según tu estructura)
import { Tax } from "../models/finances/Tax";
import { Category } from "../models/inventories/Category";
import { Supplier } from "../models/inventories/Supplier";
import { Medication } from "../models/inventories/Medication";
import { Lot } from "../models/inventories/Lot";
import { Customer } from "../models/persons/Customer";
import { Recipe } from "../models/persons/Recipe";
import { RecipeDetail } from "../models/persons/RecipeDetail";
import { Sale } from "../models/transactions/Sale";
import { SaleDetail } from "../models/transactions/SaleDetail";
import { Payment } from "../models/transactions/Payment";

// ===================== CONFIGURACIÓN =====================
const CANTIDADES = {
  impuestos: 3,
  categorias: 8,
  proveedores: 6,
  clientes: 40,
  medicamentos: 35,
  lots: 90,
  recetas: 50,
  minDetallesReceta: 1,
  maxDetallesReceta: 4,
  ventas: 80,
  minDetallesVenta: 1,
  maxDetallesVenta: 5,
  probPagoCreado: 0.7, // 70% de las ventas tendrán Payment
};

const enums = {
  docTypes: ["CC", "TI", "CE", "PP", "NIT"] as const,
  medUnits: ["tablet", "capsule", "ml", "vial", "drops"] as const,
  medStatus: ["AVAILABLE", "UNAVAILABLE"] as const,
  genericStatus: ["ACTIVE", "INACTIVE"] as const,
  recipeStatus: ["VALID", "EXPIRED"] as const,
  paymentStatus: ["PENDING", "PAID", "REFUNDED"] as const,
  paymentMethod: ["CASH", "CARD", "TRANSFER", "OTHER"] as const,
};

// ===================== HELPERS =====================
const rnd = {
  item<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  int(min: number, max: number) {
    return faker.number.int({ min, max });
  },
  money(min: number, max: number) {
    return Number(faker.number.float({ min, max, fractionDigits: 2 }).toFixed(2));
  },
  isoOffsetDays(daysOffset: number) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    return d.toISOString();
  },
  round2(n: number) {
    return Math.round(n * 100) / 100;
  },
};

async function limpiarTablas() {
  const tables: Array<ModelStatic<Model>> = [
    Payment,
    SaleDetail,
    Sale,
    RecipeDetail,
    Recipe,
    Lot,
    Medication,
    Supplier,
    Category,
    Customer,
    Tax,
  ];

  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  try {
    for (const model of tables) {
      await model.truncate({ cascade: true, restartIdentity: true });
    }
  } finally {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  }
}

// ===================== CREADORES =====================
async function crearImpuestos() {
  const base = [
    { name: "VAT 0%", rate: 0, status: "ACTIVE" as const },
    { name: "VAT 5%", rate: 0.05, status: "ACTIVE" as const },
    { name: "VAT 19%", rate: 0.19, status: "ACTIVE" as const },
  ];
  for (let i = 0; i < CANTIDADES.impuestos; i++) {
    const t = base[i % base.length];
    await Tax.create(t);
  }
  return Tax.findAll();
}

async function crearCategorias() {
  const registros: Category[] = [];
  for (let i = 0; i < CANTIDADES.categorias; i++) {
    const uniqueSuffix = `${i + 1}-${faker.string.alphanumeric({ length: 4 }).toUpperCase()}`;
    registros.push(
      await Category.create({
        name: `${faker.commerce.department()} ${uniqueSuffix}`,
        description: faker.commerce.productDescription(),
        status: "ACTIVE",
      })
    );
  }
  return registros;
}

async function crearProveedores() {
  const registros: Supplier[] = [];
  for (let i = 0; i < CANTIDADES.proveedores; i++) {
    const uniqueSuffix = `${i + 1}-${faker.string.alphanumeric({ length: 4 }).toUpperCase()}`;
    registros.push(
      await Supplier.create({
        name: `${faker.company.name()} ${uniqueSuffix}`,
        contactName: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        status: "ACTIVE",
      })
    );
  }
  return registros;
}

async function crearClientes() {
  const registros: Customer[] = [];
  for (let i = 0; i < CANTIDADES.clientes; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const slug = faker.helpers.slugify(`${firstName}.${lastName}`).toLowerCase();
    const uniqueSuffix = `${i + 1}${faker.string.alphanumeric({ length: 3 }).toLowerCase()}`;
    const username = `${slug}_${uniqueSuffix}`;
    registros.push(
      await Customer.create({
        username,
        password: faker.internet.password({ length: 12 }), // en producción, usar hash
        firstName,
        lastName,
        documentType: rnd.item(enums.docTypes),
        documentNumber: String(10000000 + i),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        status: "ACTIVE",
      })
    );
  }
  return registros;
}

async function crearMedicamentos(categorias: Category[]) {
  const registros: Medication[] = [];
  for (let i = 0; i < CANTIDADES.medicamentos; i++) {
    registros.push(
      await Medication.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        unit: rnd.item(enums.medUnits),
        price: rnd.money(3, 200),
        stock: rnd.int(0, 1000),
        categoryId: rnd.item(categorias).id,
        status: rnd.item(enums.medStatus),
      })
    );
  }
  return registros;
}

async function crearLotes(meds: Medication[], suppliers: Supplier[]) {
  const registros: Lot[] = [];
  for (let i = 0; i < CANTIDADES.lots; i++) {
    const exp = new Date();
    exp.setDate(exp.getDate() + rnd.int(30, 900)); // entre 1 y 30 meses aprox
    registros.push(
      await Lot.create({
        code: `LOT-${faker.string.alphanumeric({ length: 6 })}`.toUpperCase(),
        medicationId: rnd.item(meds).id,
        supplierId: rnd.item(suppliers).id,
        quantity: rnd.int(10, 1000),
        expirationDate: exp.toISOString().slice(0, 10),
        receivedAt: rnd.isoOffsetDays(-rnd.int(0, 200)),
        status: "ACTIVE",
      })
    );
  }
  return registros;
}

async function crearRecetas(clientes: Customer[]) {
  const registros: Recipe[] = [];
  for (let i = 0; i < CANTIDADES.recetas; i++) {
    registros.push(
      await Recipe.create({
        customerId: rnd.item(clientes).id,
        issuedAt: rnd.isoOffsetDays(-rnd.int(0, 365)),
        notes: faker.lorem.sentence(),
        status: rnd.item(enums.recipeStatus),
      })
    );
  }
  return registros;
}

async function crearDetallesReceta(recetas: Recipe[], meds: Medication[]) {
  const registros: RecipeDetail[] = [];
  for (const r of recetas) {
    const n = rnd.int(CANTIDADES.minDetallesReceta, CANTIDADES.maxDetallesReceta);
    for (let i = 0; i < n; i++) {
      const med = rnd.item(meds);
      registros.push(
        await RecipeDetail.create({
          recipeId: r.id,
          medicationId: med.id,
          dosage: `${rnd.int(100, 1000)}mg every ${rnd.int(6, 12)}h`,
          quantity: rnd.int(6, 42),
        })
      );
    }
  }
  return registros;
}

async function crearVentas(clientes: Customer[], impuestos: Tax[]) {
  const registros: Sale[] = [];
  for (let i = 0; i < CANTIDADES.ventas; i++) {
    const tax = Math.random() < 0.9 ? rnd.item(impuestos) : null; // a veces sin impuesto
    registros.push(
      await Sale.create({
        customerId: rnd.item(clientes).id,
        saleDate: rnd.isoOffsetDays(-rnd.int(0, 120)),
        subtotal: 0,
        taxTotal: 0,
        total: 0,
        status: "ACTIVE",
        taxId: tax?.id,
      })
    );
  }
  return registros;
}

async function crearDetallesVentaYTotales(ventas: Sale[], meds: Medication[]) {
  for (const v of ventas) {
    const n = rnd.int(CANTIDADES.minDetallesVenta, CANTIDADES.maxDetallesVenta);
    let subtotal = 0;

    for (let i = 0; i < n; i++) {
      const med = rnd.item(meds);
      const quantity = rnd.int(1, 5);
      const unitPrice = med.price;
      const discount = Math.random() < 0.2 ? rnd.money(0.1, Math.max(0.3 * unitPrice, 0.1)) : 0;

      subtotal += quantity * unitPrice - discount;

      await SaleDetail.create({
        saleId: v.id,
        medicationId: med.id,
        quantity,
        unitPrice,
        discount: discount > 0 ? discount : undefined,
      });
    }

    subtotal = Math.max(0, rnd.round2(subtotal));
    const tax = v.taxId ? await Tax.findByPk(v.taxId) : null;
    const taxTotal = rnd.round2(subtotal * (tax?.rate ?? 0));
    const total = rnd.round2(subtotal + taxTotal);

    await v.update({ subtotal, taxTotal, total });
  }
}

async function crearPagos(ventas: Sale[]) {
  for (const v of ventas) {
    if (Math.random() >= CANTIDADES.probPagoCreado) continue;

    // Probabilidades simples de estado
    const pagoRealizado = Math.random() < 0.85;
    const reembolsado = !pagoRealizado && Math.random() < 0.2;
    const status: "PENDING" | "PAID" | "REFUNDED" = reembolsado
      ? "REFUNDED"
      : pagoRealizado
      ? "PAID"
      : "PENDING";

    await Payment.create({
      saleId: v.id,
      amount: v.total,
      method: rnd.item(enums.paymentMethod),
      paidAt: status === "PAID" ? rnd.isoOffsetDays(-rnd.int(0, 30)) : undefined,
      status,
      reference: `TRX-${faker.string.alphanumeric({ length: 8 }).toUpperCase()}`,
    });
  }
}

// ===================== EJECUCIÓN PRINCIPAL =====================
async function crearDatosFalsos() {
  try {
    console.log("Conectando a la base de datos…");
    await sequelize.authenticate();
    console.log("Limpiando tablas…");
    await limpiarTablas();
    // Si lo necesitas en desarrollo: sincroniza el esquema temporalmente.
    // ¡OJO! No usar en producción.
    // await sequelize.sync({ alter: true });

    console.log("Creando impuestos…");
    const impuestos = await crearImpuestos();

    console.log("Creando categorías…");
    const categorias = await crearCategorias();

    console.log("Creando proveedores…");
    const proveedores = await crearProveedores();

    console.log("Creando clientes…");
    const clientes = await crearClientes();

    console.log("Creando medicamentos…");
    const medicamentos = await crearMedicamentos(categorias);

    console.log("Creando lotes…");
    await crearLotes(medicamentos, proveedores);

    console.log("Creando recetas…");
    const recetas = await crearRecetas(clientes);

    console.log("Creando detalles de receta…");
    await crearDetallesReceta(recetas, medicamentos);

    console.log("Creando ventas…");
    const ventas = await crearVentas(clientes, impuestos);

    console.log("Creando detalles de venta y recalculando totales…");
    await crearDetallesVentaYTotales(ventas, medicamentos);

    console.log("Creando pagos…");
    await crearPagos(ventas);

    console.log("✅ Datos falsos creados exitosamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear datos falsos:", error);
    process.exit(1);
  }
}

// Ejecutar
crearDatosFalsos();
