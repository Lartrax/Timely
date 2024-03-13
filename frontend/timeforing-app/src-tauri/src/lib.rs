// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Serialize;

#[derive(Serialize)]
enum Moveset {
    Use,
    Move1Back,
    Move2Back,
    Move1Forth,
    Move2Forth,
    Add,
}
#[derive(Serialize)]
struct WordDistanceResponse {
    distance: f32,
    moves: Vec<Moveset>,
}

#[tauri::command]
fn word_distance(first: &str, second: &str) -> WordDistanceResponse {
    // Set base to longest
    let mut base: Vec<char> = first.chars().collect();
    let comp: Vec<char> = second.chars().collect();

    if comp.len() > base.len() {
        let diff = comp.len() - base.len();
        let diff_slice = vec![' '; diff];
        base.extend_from_slice(&diff_slice);
    }

    let length: usize = if base.len() > comp.len() {
        base.len()
    } else {
        comp.len()
    };

    let mut distance = 0.0;

    #[derive(Debug, Clone)]
    struct Moves {
        use_char: bool,
        move_char: (bool, f32),
        add_char: bool,
    }

    let mut movement_construct = vec![
        Moves {
            use_char: false,
            move_char: (false, 0.0),
            add_char: false
        };
        length
    ];

    for (i, base_char) in base.clone().into_iter().enumerate() {
        for (j, comp_char) in comp.clone().into_iter().enumerate() {
            // Action: Use; Because chars are the same and at the same index
            if base_char == comp_char && i == j {
                movement_construct[i].use_char = true;
            }

            // Action: Move; Because chars are the same but indices are different
            if base_char == comp_char && i != j {
                let diff = i as f32 - j as f32;
                movement_construct[i].move_char.0 = true;
                movement_construct[i].move_char.1 = diff;
            }

            // Action: Add; Because char does not exist in comp
            if base_char != comp_char {
                movement_construct[i].add_char = true;
            }
        }
    }

    let mut moveset: Vec<Moveset> = vec![];

    // Calcualte cost based on best moves: use > move > add
    for movement in movement_construct.clone() {
        if movement.use_char {
            // No distance added
            moveset.push(Moveset::Use)
        } else if movement.move_char.0 && movement.move_char.1 < 3.0 {
            // Only move chars if it is less costly than adding /\
            // Add 0.4 for each index moved
            distance += movement.move_char.1.abs() * 0.4;

            if movement.move_char.1 == -2.0 {
                moveset.push(Moveset::Move2Back);
            } else if movement.move_char.1 == -1.0 {
                moveset.push(Moveset::Move1Back);
            } else if movement.move_char.1 == 1.0 {
                moveset.push(Moveset::Move1Forth);
            } else if movement.move_char.1 == 2.0 {
                moveset.push(Moveset::Move2Forth);
            }
        } else if movement.add_char {
            // Add 1 for adding new char
            distance += 1.0;
            moveset.push(Moveset::Add)
        }
    }

    // If first is 3 or larger we check if second contains first
    // This way we avoid calculating distance for obvious words
    if second.contains(first) && first.len() > 2 {
        return WordDistanceResponse {
            distance: 0.0,
            moves: moveset,
        };
    }

    WordDistanceResponse {
        distance,
        moves: moveset,
    }
}

#[derive(Serialize)]
struct PrimeResponse {
    duration: String,
    primes: Vec<u32>,
}

#[tauri::command]
fn get_primes(limit: u32) -> PrimeResponse {
    let count = limit;

    use std::time::Instant;

    let timer = Instant::now();
    if count > 20000000 {
        return PrimeResponse {
            duration: format!("{:?}", timer.elapsed()),
            primes: vec![],
        };
    }
    if count < 11 {
        return PrimeResponse {
            duration: format!("{:?}", timer.elapsed()),
            primes: vec![2, 3, 5, 7],
        };
    }
    let mut list_numbers: Vec<u32> = Vec::with_capacity(count as usize - 1);

    list_numbers.push(2);
    list_numbers.push(3);
    list_numbers.push(5);
    for i in 7..=count {
        if i % 2 == 0 || i % 5 == 0 || i % 3 == 0 {
            continue;
        }
        list_numbers.push(i)
    }

    let mut index: usize = 3;

    loop {
        let mut mutable_list_numbers = list_numbers.clone();
        mutable_list_numbers.retain(|&n| n % list_numbers[index] != 0 || n == list_numbers[index]);
        list_numbers = mutable_list_numbers;
        index += 1;
        if list_numbers[index] * list_numbers[index] >= list_numbers.len() as u32 {
            break;
        }
    }

    PrimeResponse {
        duration: format!("{:?}", timer.elapsed()),
        primes: list_numbers,
    }
}

fn random_number(start: usize, end: usize) -> usize {
    use rand::Rng;

    let mut rng = rand::thread_rng();
    rng.gen_range(start..=end)
}

#[derive(Serialize)]
struct SortResponse {
    duration: String,
    iterations: String,
    sorted: Vec<u32>,
}

#[tauri::command]
fn get_sort(sort_type: String, length: usize, span: usize) -> SortResponse {
    use std::time::Instant;
    let timer = Instant::now();
    let mut iterations = 0;

    let mut unsorted_vec: Vec<u32> = Vec::with_capacity(length);

    for _ in 0..length {
        unsorted_vec.push(random_number(0, span).try_into().unwrap());
    }

    let sorted_vec: Vec<u32> = if sort_type == "fullbogo" {
        let full_bogo_sorted = full_bogo(unsorted_vec);
        iterations = full_bogo_sorted.1;
        full_bogo_sorted.0
    } else if sort_type == "bogo" {
        let bogo_sorted = bogo(unsorted_vec);
        iterations = bogo_sorted.1;
        bogo_sorted.0
    } else if sort_type == "timsort" {
        let mut sorted = unsorted_vec;
        sorted.sort();
        sorted
    } else if sort_type == "counting_btree" {
        let new_sorted = counting_btree(unsorted_vec);
        iterations = new_sorted.1;
        new_sorted.0
    } else {
        vec![]
    };

    SortResponse {
        duration: format!("{:?}", timer.elapsed()),
        iterations: iterations
            .to_string()
            .as_bytes()
            .rchunks(3)
            .rev()
            .map(std::str::from_utf8)
            .collect::<Result<Vec<&str>, _>>()
            .unwrap()
            .join(" "),
        sorted: sorted_vec,
    }
}

fn full_bogo(unsorted: Vec<u32>) -> (Vec<u32>, u32) {
    let mut pre_sorted_vec = unsorted.clone();
    pre_sorted_vec.sort();

    let mut iterations = 0;

    let mut sorted_vec = vec![0; unsorted.len()];

    while pre_sorted_vec != sorted_vec {
        for num in unsorted.clone() {
            let rand_index = random_number(0, unsorted.len() - 1);
            sorted_vec[rand_index] = num;
            iterations += 1;
        }
    }
    (sorted_vec, iterations)
}

fn bogo(mut unsorted: Vec<u32>) -> (Vec<u32>, u32) {
    let mut pre_sorted_vec = unsorted.clone();
    pre_sorted_vec.sort();

    let mut iterations = 0;

    while pre_sorted_vec != unsorted {
        for (i, _) in unsorted.clone().into_iter().enumerate() {
            let rand_index = random_number(0, unsorted.len() - 1);
            unsorted.swap(i, rand_index);
            iterations += 1;
        }
    }
    (unsorted, iterations)
}

fn counting_btree(unsorted: Vec<u32>) -> (Vec<u32>, u32) {
    use std::collections::BTreeMap;
    // BTreeMap: Number, Count
    let mut number_list: BTreeMap<u32, u32> = BTreeMap::new();

    let length = unsorted.len();

    let mut iterations = 0;

    for num in unsorted {
        // Does the same as:
        // if number_list.contains_key(&num) {
        //     number_list.entry(num).and_modify(|e| *e += 1);
        // } else {
        //     number_list.insert(num, 1);
        // }
        // But requires only 1 lookup instead of 2
        // https://github.com/rust-lang/rust-clippy/issues/1774
        // Checks if entry is vacant and inserts into vacant entry if empty else it increases count of existing entry
        if let std::collections::btree_map::Entry::Vacant(e) = number_list.entry(num) {
            e.insert(1);
        } else {
            number_list.entry(num).and_modify(|e| *e += 1);
        }

        iterations += 1;
    }

    let mut sorted: Vec<u32> = Vec::with_capacity(length);

    for item in number_list {
        for _ in 0..item.1 {
            sorted.push(item.0);
        }
    }

    (sorted, iterations)
}

#[tauri::command]
fn log(log: &str) {
    println!("{}", log.replace('"', ""))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            word_distance,
            log,
            get_primes,
            get_sort
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
