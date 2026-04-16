import 'dotenv/config';
import '../api/middlewares/express.d';
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('\n===================================');
  console.log('🚀 EventHub Backend Server');
  console.log('===================================');
  console.log(`✅ Serveur en cours d'exécution sur http://localhost:${PORT}`);
  console.log(`🌐 Frontend URL autorisée: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`📱 App Name: ${process.env.APP_NAME || 'EventHub'}`);
  console.log(`🔐 Auth: ${process.env.JWT_SECRET ? '✅ JWT_SECRET configuré' : '❌ JWT_SECRET MANQUANT'}`);
  console.log(`📊 DB: ${process.env.DATABASE_URL ? '✅ DATABASE_URL configurée' : '❌ DATABASE_URL MANQUANTE'}`);
  console.log('===================================\n');
});

// Garder le serveur actif
server.on('error', (error: any) => {
  console.error('❌ Erreur serveur:', error);
  process.exit(1);
});

export default server;