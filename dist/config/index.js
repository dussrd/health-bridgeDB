"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("../database/db");
const index_1 = require("../routes/index");
var cors = require("cors");
dotenv_1.default.config();
class App {
    constructor(port) {
        this.port = port;
        this.routePrv = new index_1.Routes();
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
        this.dbConnection();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(cors());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    // Route configuration
    routes() {
        this.routePrv.taxRoutes.routes(this.app);
        this.routePrv.categoryRoutes.routes(this.app);
        this.routePrv.lotRoutes.routes(this.app);
        this.routePrv.medicationRoutes.routes(this.app);
        this.routePrv.supplierRoutes.routes(this.app);
        this.routePrv.customerRoutes.routes(this.app);
        this.routePrv.recipedetailRoutes.routes(this.app);
        this.routePrv.recipeRoutes.routes(this.app);
        this.routePrv.paymentRoutes.routes(this.app);
        this.routePrv.saledetailRoutes.routes(this.app);
        this.routePrv.saleRoutes.routes(this.app);
        this.routePrv.userRoutes.routes(this.app);
        this.routePrv.roleRoutes.routes(this.app);
        this.routePrv.roleUserRoutes.routes(this.app);
        this.routePrv.refreshTokenRoutes.routes(this.app);
        this.routePrv.resourceRoutes.routes(this.app);
        this.routePrv.resourceRoleRoutes.routes(this.app);
        this.routePrv.authRoutes.routes(this.app);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Mostrar información de la base de datos seleccionada
                const dbInfo = (0, db_1.getDatabaseInfo)();
                console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`);
                // Probar la conexión
                const isConnected = yield (0, db_1.testConnection)();
                if (!isConnected) {
                    throw new Error(`No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`);
                }
                // Sincronizar la base de datos
                yield db_1.sequelize.sync({ force: false });
                console.log(`📦 Base de datos sincronizada exitosamente`);
            }
            catch (error) {
                console.error("❌ Error al conectar con la base de datos:", error);
                process.exit(1); // Terminar la aplicación si no se puede conectar
            }
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log(`🚀 Servidor ejecutándose en puerto ${this.app.get('port')}`);
        });
    }
}
exports.App = App;
