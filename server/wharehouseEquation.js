function calc_equations(response) {
    if (response.shape == "wh4") {
        readers = 1;
    } else readers = 2;

    var readers_cost = readers * 4100;

    if (response.dw == 0 || response.dl == 0) {
        return "width and length sizes are required";
    } else area = response.dl * response.dw;

    if (area <= 500) {
        trucks = 3;
        forklift_trucks = 1;
        cartons = 120000;
    } else if (area > 500 || area <= 1000) {
        trucks = 5;
        forklift_trucks = 2;
        cartons = 250000;
    } else if (area > 1000 || area <= 1500) {
        trucks = 7;
        forklift_trucks = 3;
        cartons = 370000;
    } else if (area > 1500) {
        trucks = 10;
        forklift_trucks = 3;
        cartons = 500000;
        pallets = cartons / 4;
    }

    workers = trucks * int(shifts_per_day);

    printers = 1;
    printers_cost = 3550;
    system_wh = 4230;
    handheld_numbers = int(workers) / 2;
    handheld_cost = 3250 * handheld_numbers;
    trucks_readers_cost = 3655 * forklift_trucks;

    results = {
        shape: shape,
        space: area,
        trucks: trucks,
        trucks_readers: forklift_trucks,
        trucks_readers_cost: trucks_readers_cost,
        handhelds: handheld_numbers,
        handheld_cost: handheld_cost,
        workers: workers,
        receive: receive,
        cartons: cartons,
        pallets: pallets,
        gate_readers: readers,
        gate_readers_cost: readers_cost,
        printers: printers,
        printers_cost: printers_cost,
        wh_sys: system_wh,
        company_name: response.company_name,
        industry_type: response.industry_type,
        contact_name: response.contact_name,
        contact_email: response.contact_email,
        contact_phone: response.contact_phone
    };
  return results
}
