import assert from "node:assert/strict";
import test from "node:test";
import { suggestsStockAgent } from "../lib/munim-chat.js";

test("stock questions stay in conversation without suggesting a delegation", () => {
  for (const question of ["How much stock do I have?", "How is Dadar doing?", "Diwali ke liye paisa kahan se aayega?", "What is a stock agent?", "Explain just-in-time inventory.", "Can Gupta split the invoice?", "Should I reorder stock?", "Can I monitor stock myself?"]) {
    assert.equal(suggestsStockAgent(question), false, question);
  }
});

test("requests to delegate stock work offer a setup choice", () => {
  for (const question of ["Set up a stock agent", "Create an agent to manage inventory", "Monitor stock for me", "Can you watch my inventory?", "Automatically reorder stock when it runs low", "I want JIT ordering", "Delegate supplier orders to an agent", "Stock ka agent chahiye", "Order more stock when I run low", "Can you reorder inventory for me?"]) {
    assert.equal(suggestsStockAgent(question), true, question);
  }
});

test("declining a stock delegation never suggests setup", () => {
  for (const question of ["Don't set up a stock agent", "Do not monitor my stock", "Never reorder automatically", "I am not ready to create an agent", "Cancel stock monitoring", "No agent please"]) {
    assert.equal(suggestsStockAgent(question), false, question);
  }
});

test("blank and unrelated messages have no delegation intent", () => {
  for (const question of ["", "   ", "Thanks", "What are the loan terms?", "Monitor my EMI", "Can you explain cash flow?", "Create a payroll agent", "Set up a loan agent"]) assert.equal(suggestsStockAgent(question), false, question);
});
