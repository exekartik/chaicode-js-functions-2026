/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  if (!name || typeof name !== 'string' || name.trim() === "") {
    return null;
  }
  if (typeof days !== 'number' || isNaN(days) || days <= 0 || !Number.isInteger(days)) {
    return null;
  }
  const prices = { veg: 80, nonveg: 120, jain: 90 };
  const lowerType = mealType.toLowerCase();
  const dailyRate = prices[lowerType];
  if (dailyRate === undefined) {
    return null;
  }
  const totalCost = dailyRate * days;
  return {
    name,
    mealType: lowerType,
    days,
    dailyRate,
    totalCost
  };
}

export function combinePlans(...plans) {
  const validPlans = plans.filter(p => p && typeof p === 'object' && typeof p.totalCost === 'number');
  if (validPlans.length === 0) {
    return null;
  }
  
  let totalRevenue = 0;
  const mealBreakdown = {};
  
  for (const plan of validPlans) {
    totalRevenue += plan.totalCost;
    if (plan.mealType) {
      mealBreakdown[plan.mealType] = (mealBreakdown[plan.mealType] || 0) + 1;
    }
  }
  
  return {
    totalCustomers: validPlans.length,
    totalRevenue,
    mealBreakdown
  };
}

export function applyAddons(plan, ...addons) {
  if (!plan || typeof plan !== 'object' || Array.isArray(plan) || typeof plan.dailyRate !== 'number') {
    return null;
  }
  
  let newDailyRate = plan.dailyRate;
  const addonNames = [];
  
  for (const addon of addons) {
    if (addon && typeof addon.price === 'number') {
      newDailyRate += addon.price;
    }
    if (addon && typeof addon.name === 'string') {
      addonNames.push(addon.name);
    }
  }
  
  const totalCost = newDailyRate * plan.days;
  return {
    ...plan,
    dailyRate: newDailyRate,
    totalCost,
    addonNames
  };
}
