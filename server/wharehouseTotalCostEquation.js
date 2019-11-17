function totalcost(response, type) {
  total_cost = 0;
  try {
    trucks = response.trucks;
    trucks_readers = response.trucks_readers;
    handhelds = response.handhelds;
    workers = response.workers;
    pallets = 0;
    cartons = 0;
    if (type == "pallets") {
      pallets = response.pallets;
    }
    if (type == "cartons") {
      cartons = response.cartons;
    }
    gate_readers = response.gate_readers;
    printers = response.printers;

    trucks_readers_cost = 3655 * int(trucks_readers);
    handheld_cost = 3250 * int(handhelds);
    gate_readers_cost = int(gate_readers) * 4100;
    printers_cost = 3550 * int(printers);
    system_wh = 4230;

    tag_cost = float(pallets) * 0.31 + float(cartons) * 0.31;
    total_cost =
      tag_cost +
      trucks_readers_cost +
      handheld_cost +
      gate_readers_cost +
      printers_cost +
      system_wh;
  } catch (error) {
    return "error in calculating total cost, please revise the numbers";
  }
  return totalcost;
}
