import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: "user-1",
        email: "admin@eventhub.com",
        password: "admin123",
        name: "Admin User",
        role: "admin",
      },
      {
        id: "user-2",
        email: "john@example.com",
        password: "password123",
        name: "John Doe",
        role: "user",
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      { id: "cat-1", name: "Musique" },
      { id: "cat-2", name: "Tech" },
      { id: "cat-3", name: "Sport" },
    ],
  });

  await prisma.venue.createMany({
    data: [
      {
        id: "venue-1",
        name: "Stade de France",
        address: "93 Rue Jules Rimet",
        city: "Saint-Denis",
        capacity: 80000,
        accessibility: true,
        equipment: "Écrans géants, sonorisation",
      },
      {
        id: "venue-2",
        name: "Zénith de Paris",
        address: "211 Avenue Jean Jaurès",
        city: "Paris",
        capacity: 6000,
        accessibility: true,
      },
    ],
  });

  await prisma.event.createMany({
    data: [
      {
        id: "event-1",
        title: "Concert Rock Festival",
        description: "Le plus grand festival de rock de l'année",
        date: new Date("2026-06-15"),
        capacity: 5000,
        price: 49.99,
        categoryId: "cat-1",
        organizerId: "user-1",
        venueId: "venue-2",
      },
      {
        id: "event-2",
        title: "Tech Conference 2026",
        description: "Conférence sur les nouvelles technologies",
        date: new Date("2026-05-20"),
        capacity: 500,
        price: 99.99,
        categoryId: "cat-2",
        organizerId: "user-1",
        venueId: "venue-1",
      },
    ],
  });

  await prisma.ticket.createMany({
    data: [
      {
        id: "ticket-1",
        type: "Standard",
        price: 49.99,
        quantity: 4000,
        eventId: "event-1",
      },
      {
        id: "ticket-2",
        type: "VIP",
        price: 99.99,
        quantity: 1000,
        eventId: "event-1",
      },
    ],
  });

  await prisma.booking.create({
    data: {
      id: "booking-1",
      quantity: 2,
      status: "confirmed",
      userId: "user-2",
      eventId: "event-1",
    },
  });

  await prisma.review.create({
    data: {
      id: "review-1",
      rating: 5,
      comment: "Excellent événement !",
      userId: "user-2",
      eventId: "event-1",
    },
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
