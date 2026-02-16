import { z } from "zod";

const BUDGET_RANGES = ["<100€", "100-200€", "200-400€", "400€+"] as const;
const DELIVERY_OPTIONS = ["ritiro", "spedizione"] as const;
const TECHNIQUES = ["strass", "patch", "ricamo", "mix"] as const;

export const customRequestSchema = z.object({
  honeypot: z.string().max(0).optional(),
  hatBase: z.enum(["59FIFTY", "9FORTY", "Trucker", "Beanie"]),
  color: z.string().min(1, "Colore obbligatorio").max(100),
  size: z.string().max(20).optional(),
  techniques: z.array(z.enum(TECHNIQUES)).min(1, "Seleziona almeno una tecnica"),
  text: z.string().max(500).optional(),
  palette: z.string().max(200).optional(),
  inspirationLink1: z.string().max(500).optional(),
  inspirationLink2: z.string().max(500).optional(),
  inspirationLink3: z.string().max(500).optional(),
  budgetRange: z.enum(BUDGET_RANGES),
  desiredDate: z.string().optional(),
  delivery: z.enum(DELIVERY_OPTIONS),
  name: z.string().min(2, "Nome richiesto").max(100),
  email: z.string().email("Email non valida"),
  phone: z.string().min(6, "Telefono richiesto").max(30),
  instagram: z.string().max(100).optional(),
});

export type CustomRequestInput = z.infer<typeof customRequestSchema>;
