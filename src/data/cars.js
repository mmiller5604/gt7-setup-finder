// Complete Gran Turismo 7 car roster (sourced from in-game car list)
// Sorted alphabetically within each manufacturer group, then sorted overall.

const cars = [
  // Abarth
  "Abarth 1500 Biposto Bertone B.A.T 1 '52",
  "Abarth 500 '09",
  "Abarth 595 SS '70",

  // AFEELA
  "AFEELA 1 '26",
  "AFEELA Prototype 2024",

  // Alfa Romeo
  "Alfa Romeo 155 2.5 V6 TI '93",
  "Alfa Romeo 4C '14",
  "Alfa Romeo 4C Gr.3",
  "Alfa Romeo 4C Gr.3 Road Car",
  "Alfa Romeo 4C Gr.4",
  "Alfa Romeo 8C 2900B Touring Berlinetta '38",
  "Alfa Romeo 8C Competizione '08",
  "Alfa Romeo GIULIA TZ2 carrozzata da ZAGATO '65",
  "Alfa Romeo Giulia GTAm '20",
  "Alfa Romeo Giulia Sprint GT Veloce '67",
  "Alfa Romeo MiTo '09",

  // Alpine
  "Alpine A110 '17",
  "Alpine A110 '72",
  "Alpine A220 Race Car '68",
  "Alpine Vision Gran Turismo",
  "Alpine Vision Gran Turismo '17",
  "Alpine Vision Gran Turismo Race",

  // AMG
  "AMG 300 SEL 6.8 AMG '71",
  "AMG A 45 AMG '13",
  "AMG CLK-LM '98",
  "AMG Mercedes-AMG C 63 S '15",
  "AMG Mercedes-AMG GT Black Series '20",
  "AMG Mercedes-AMG GT R '17",
  "AMG Mercedes-AMG GT S '15",
  "AMG Mercedes-AMG GT Safety Car",
  "AMG Mercedes-AMG GT3 '16",
  "AMG Mercedes-AMG GT3 '20",
  "AMG Mercedes-Benz AMG Vision Gran Turismo",
  "AMG Mercedes-Benz AMG Vision Gran Turismo Racing Series",
  "AMG SLS AMG '10",
  "AMG SLS AMG Gr.4",
  "AMG SLS AMG GT3 '11",

  // Amuse
  "Amuse NISMO 380RS Super Leggera",
  "Amuse S2000 GT1 Turbo",

  // Aston Martin
  "Aston Martin DB11 '16",
  "Aston Martin DB3S '53",
  "Aston Martin DB5 '64",
  "Aston Martin DBR9 GT1 '10",
  "Aston Martin DP-100 Vision Gran Turismo",
  "Aston Martin One-77 '11",
  "Aston Martin V12 Vantage GT3 '12",
  "Aston Martin V8 Vantage Gr.4",
  "Aston Martin V8 Vantage S '15",
  "Aston Martin Valkyrie '21",
  "Aston Martin Vantage '18",
  "Aston Martin Vulcan '16",

  // Audi
  "Audi R8 4.2 '07",
  "Audi R8 Coupé V10 plus '16",
  "Audi R8 LMS '15",
  "Audi R8 LMS Evo '19",
  "Audi R18 '16",
  "Audi R18 TDI '11",
  "Audi RS 5 Turbo DTM '19",
  "Audi Sport Quattro S1 Pikes Peak '87",
  "Audi TT Coupé 3.2 quattro '03",
  "Audi TT Cup '16",
  "Audi TTS Coupé '09",
  "Audi TTS Coupé '14",
  "Audi Vision Gran Turismo",
  "Audi e-tron Vision Gran Turismo",

  // Autobianchi
  "Autobianchi A112 Abarth '85",

  // BAC
  "BAC Mono '16",

  // BMW
  "BMW 3.0 CSL '71",
  "BMW 3.0 CSL '73",
  "BMW M2 Competition '18",
  "BMW M3 '03",
  "BMW M3 '07",
  "BMW M3 '89",
  "BMW M3 '97",
  "BMW M3 GT '11",
  "BMW M3 Sport Evolution '89",
  "BMW M4 '14",
  "BMW M4 Gr.4",
  "BMW M4 Safety Car",
  "BMW M6 GT3 Endurance Model '16",
  "BMW M6 GT3 Sprint Model '16",
  "BMW McLaren F1 GTR Race Car '97",
  "BMW Vision Gran Turismo",
  "BMW Z4 3.0i '03",
  "BMW Z4 GT3 '11",
  "BMW Z8 '01",

  // Bugatti
  "Bugatti Chiron '16",
  "Bugatti Veyron 16.4 '13",
  "Bugatti Veyron Gr.4",
  "Bugatti Vision Gran Turismo",
  "Bugatti Vision Gran Turismo (Gr.1)",

  // BVLGARI
  "BVLGARI Aluminium Vision Gran Turismo",

  // Chaparral
  "Chaparral 2J '70",
  "Chaparral 2X Vision Gran Turismo",

  // Chevrolet
  "Chevrolet Camaro SS '16",
  "Chevrolet Camaro Z28 '69",
  "Chevrolet Camaro ZL1 1LE Package '18",
  "Chevrolet Chevelle SS 454 Sport Coupé '70",
  "Chevrolet Corvette (C1) '58",
  "Chevrolet Corvette (C2) '63",
  "Chevrolet Corvette C7 '14",
  "Chevrolet Corvette C7 Gr.3",
  "Chevrolet Corvette C7 Gr.3 Road Car",
  "Chevrolet Corvette C7 Gr.4",
  "Chevrolet Corvette C7 ZR1 '19",
  "Chevrolet Corvette C8 '20",
  "Chevrolet Corvette Convertible (C3) '69",
  "Chevrolet Corvette CX Concept '25",
  "Chevrolet Corvette CX.R Vision Gran Turismo Concept",
  "Chevrolet Corvette Stingray (C3) '69",
  "Chevrolet Corvette Stingray Racer Concept '59",
  "Chevrolet Corvette Z06 (C5) '01",
  "Chevrolet Corvette ZR-1 (C4) '89",
  "Chevrolet Corvette ZR1 (C6) '09",

  // Chris Holstrom Concepts
  "Chris Holstrom Concepts '67 Chevy Nova",

  // Citroën
  "Citroën BX 19 TRS '87",
  "Citroën DS 21 Pallas '70",
  "Citroën GT by Citroën Gr.4",
  "Citroën GT by Citroën Race Car (Gr.3)",
  "Citroën GT by Citroën Road Car",

  // Daihatsu
  "Daihatsu COPEN RJ Vision Gran Turismo",
  "Daihatsu Copen '02",

  // De Tomaso
  "De Tomaso Mangusta '69",
  "De Tomaso NSX GT500 '00",
  "De Tomaso Pantera '71",

  // DMC
  "DMC DeLorean S2 '04",

  // Dodge
  "Dodge Challenger R/T '70",
  "Dodge Challenger SRT Demon '18",
  "Dodge Charger R/T 426 Hemi '68",
  "Dodge Charger SRT Hellcat '15",
  "Dodge Charger SRT Hellcat Safety Car",
  "Dodge SRT Tomahawk GTS-R Vision Gran Turismo",
  "Dodge SRT Tomahawk S Vision Gran Turismo",
  "Dodge SRT Tomahawk Vision Gran Turismo (Gr.1)",
  "Dodge SRT Tomahawk X Vision Gran Turismo",
  "Dodge Super Bee '70",
  "Dodge Viper GTS '02",
  "Dodge Viper GTS '13",
  "Dodge Viper Gr.4",
  "Dodge Viper SRT GT3-R '15",
  "Dodge Viper SRT10 Coupe '06",

  // DS Automobiles
  "DS Automobiles DS 3 Racing '11",

  // Eckert's Rod & Custom
  "Eckert's Rod & Custom Mach Forty",

  // Ferrari
  "Ferrari 250 GT Berlinetta passo corto '61",
  "Ferrari 250 GTO '62",
  "Ferrari 296 GT3 '23",
  "Ferrari 296 GTB '22",
  "Ferrari 308 GTB '75",
  "Ferrari 330 P4 '67",
  "Ferrari 365 GTB4 '71",
  "Ferrari 430 Scuderia '07",
  "Ferrari 458 Italia '09",
  "Ferrari 458 Italia GT3 '13",
  "Ferrari 458 Italia Gr.4",
  "Ferrari 500 Mondial Pinin Farina Coupe '54",
  "Ferrari 512 BB '76",
  "Ferrari Dino 246 GT '71",
  "Ferrari Enzo Ferrari '02",
  "Ferrari F12berlinetta '12",
  "Ferrari F40 '92",
  "Ferrari F430 '06",
  "Ferrari F50 '95",
  "Ferrari F8 Tributo '19",
  "Ferrari FXX K '14",
  "Ferrari GTO '84",
  "Ferrari LaFerrari '13",
  "Ferrari Testarossa '91",
  "Ferrari Vision Gran Turismo",

  // Fiat
  "Fiat 500 1.2 8V Lounge SS '08",
  "Fiat 500 F '68",
  "Fiat Panda 30 CL '85",

  // Ford
  "Ford Escort RS Cosworth '92",
  "Ford F-150 SVT Raptor '11",
  "Ford Focus Gr.B Rally Car",
  "Ford Focus RS '18",
  "Ford Focus ST '15",
  "Ford GT '06",
  "Ford GT '17",
  "Ford GT LM Race Car Spec II",
  "Ford GT LM Spec II Test Car",
  "Ford GT Race Car '18",
  "Ford GT40 Mark I '66",
  "Ford Mark IV Race Car '67",
  "Ford Mustang Boss 429 '69",
  "Ford Mustang GT '15",
  "Ford Mustang Gr.3",
  "Ford Mustang Gr.3 Road Car",
  "Ford Mustang Gr.4",
  "Ford Mustang Gr.B Rally Car",
  "Ford Mustang Mach 1 '71",
  "Ford Shelby GT350R '16",
  "Ford Sierra RS 500 Cosworth '87",

  // Garage RCR
  "Garage RCR Civic",

  // Genesis
  "Genesis G70 3.3T AWD P.Package '22",
  "Genesis G70 GR4",
  "Genesis Coupe 3.8 '13",
  "Genesis Gr.3",
  "Genesis Gr.4",
  "Genesis Gr.B Rally Car",
  "Genesis X GR3",
  "Genesis X Gran Berlinetta Vision Gran Turismo Concept",
  "Genesis X Gran Racer Vision Gran Turismo Concept",

  // Gran Turismo (original cars)
  "Gran Turismo F1500T-A",
  "Gran Turismo F3500-A",
  "Gran Turismo F3500-B",
  "Gran Turismo Racing Kart 125 Shifter",
  "Gran Turismo Red Bull X2014 Junior",
  "Gran Turismo Red Bull X2014 Standard",
  "Gran Turismo Red Bull X2019 Competition",

  // Greddy
  "Greddy Fugu Z",

  // Greening Auto Company
  "Greening Auto Company Maverick",

  // Honda
  "Honda 2&4 powered by RC213V",
  "Honda Beat '91",
  "Honda Civic Si Extra (EF) '87",
  "Honda Civic SiR·II (EG) '93",
  "Honda Civic Type R (EK) '97",
  "Honda Civic Type R (EK) '98",
  "Honda Civic Type R (EK) Touring Car",
  "Honda Civic Type R (FK2) '15",
  "Honda Civic Type R (FL5) '22",
  "Honda Civic Type R Limited Edition (FK8) '20",
  "Honda CR-V e:HEV EX Black Edition '21",
  "Honda Fit Hybrid '14",
  "Honda Honda Sports Vision Gran Turismo",
  "Honda Integra Type R (DC2) '95",
  "Honda Integra Type R (DC2) '98",
  "Honda N-ONE RS '22",
  "Honda NSX '17",
  "Honda NSX CONCEPT-GT '16",
  "Honda NSX GT500 '08",
  "Honda NSX Gr.3",
  "Honda NSX Gr.4",
  "Honda NSX Gr.B Rally Car",
  "Honda NSX Type R '02",
  "Honda NSX Type R '92",
  "Honda RA272 '65",
  "Honda S2000 '99",
  "Honda S660 '15",
  "Honda S800 '66",

  // Hyundai
  "Hyundai ELANTRA N '23",
  "Hyundai ELANTRA N TC '24",
  "Hyundai HYUNDAI N 2025 Vision Gran Turismo",
  "Hyundai HYUNDAI N 2025 Vision Gran Turismo (Gr.1)",
  "Hyundai IONIQ 5 N '24",

  // Infiniti
  "Infiniti INFINITI CONCEPT Vision Gran Turismo",

  // Italdesign
  "Italdesign Vision Gran Turismo Off-road Mode",
  "Italdesign Vision Gran Turismo Street Mode",

  // Jaguar
  "Jaguar D-type '54",
  "Jaguar E-type Coupé '61",
  "Jaguar F-type Gr.3",
  "Jaguar F-type Gr.4",
  "Jaguar F-type R '14",
  "Jaguar Vision Gran Turismo Coupé",
  "Jaguar Vision Gran Turismo Roadster",
  "Jaguar Vision Gran Turismo SV",
  "Jaguar XJ13 '66",
  "Jaguar XJ220 '92",
  "Jaguar XJR-9 '88",

  // Jeep
  "Jeep Willys MB '45",

  // KTM
  "KTM X-BOW R '12",

  // Lamborghini
  "Lamborghini Aventador LP 700-4 '11",
  "Lamborghini Aventador LP 750-4 SV '15",
  "Lamborghini Countach 25th Anniversary '88",
  "Lamborghini Countach LP400 '74",
  "Lamborghini Diablo GT '00",
  "Lamborghini Gallardo LP 560-4 '08",
  "Lamborghini Huracán GT3 '15",
  "Lamborghini Huracán Gr.4",
  "Lamborghini Huracán LP 610-4 '15",
  "Lamborghini Lambo V12 Vision Gran Turismo",
  "Lamborghini Miura P400 Bertone Prototype '67",
  "Lamborghini Murciélago LP 640 '09",
  "Lamborghini Urus '18",
  "Lamborghini Veneno '14",

  // Lancia
  "Lancia Delta HF Integrale Evoluzione '91",
  "Lancia Delta HF Integrale Rally Car '92",
  "Lancia Stratos '73",

  // Lexus
  "Lexus LC500 '17",
  "Lexus LF-LC GT Vision Gran Turismo",
  "Lexus LFA '10",
  "Lexus RC F '14",
  "Lexus RC F GT3 '17",
  "Lexus RC F GT3 prototype '16",
  "Lexus RC F GT500 '16",
  "Lexus RC F Gr.4",
  "Lexus SC430 GT500 '08",

  // Maserati
  "Maserati A6GCS/53 Spyder '54",
  "Maserati GranTurismo S '08",
  "Maserati MC20 '20",

  // Mazda
  "Mazda 787B '91",
  "Mazda Atenza Gr.3",
  "Mazda Atenza Gr.3 Road Car",
  "Mazda Atenza Gr.4",
  "Mazda Atenza Sedan XD L Package '15",
  "Mazda CX-30 X Smart Edition '21",
  "Mazda Demio XD Touring '15",
  "Mazda Eunos Roadster (NA) '89",
  "Mazda LM55 Vision Gran Turismo",
  "Mazda LM55 Vision Gran Turismo (Gr.1)",
  "Mazda MAZDA SPIRIT RACING ROADSTER 12R '25",
  "Mazda MAZDA3 Gr.4",
  "Mazda Mazda3 '19",
  "Mazda Roadster NR-A (ND) '22",
  "Mazda Roadster S (ND) '15",
  "Mazda Roadster Touring Car",
  "Mazda RX-7 GT-X (FC) '90",
  "Mazda RX-7 Spirit R Type A (FD) '02",
  "Mazda RX-8 Spirit R '12",
  "Mazda RX-VISION '15",
  "Mazda RX-VISION GT3 CONCEPT",
  "Mazda RX-VISION GT3 CONCEPT Stealth Model",
  "Mazda RX500 '70",
  "Mazda MR2 GT-S '97",

  // McLaren
  "McLaren 650S '14",
  "McLaren 650S GT3 '15",
  "McLaren 650S Gr.4",
  "McLaren F1 '94",
  "McLaren F1 GTR - BMW '95",
  "McLaren MP4-12C '10",
  "McLaren MP4/4 '88",
  "McLaren P1 GTR '16",
  "McLaren Vision Gran Turismo",
  "McLaren Vision Gran Turismo (Gr.1)",

  // Mercedes-Benz
  "Mercedes-Benz 190 E 2.5-16 Evolution II '91",
  "Mercedes-Benz 300 SL (W194) '52",
  "Mercedes-Benz 300 SL Coupé '54",
  "Mercedes-Benz S Barker Tourer '29",
  "Mercedes-Benz Sauber Mercedes C9 '89",
  "Mercedes-Benz SLR McLaren '09",
  "Mercedes-Benz Unimog Type 411 '62",
  "Mercedes-Benz W 196 R '55",

  // Mine's
  "Mine's BNR34 GT-R N1 base",

  // MINI
  "MINI Clubman Vision Gran Turismo",
  "MINI Cooper S '05",
  "Mini Mini-Cooper 'S' '65",

  // Mitsubishi
  "Mitsubishi Concept XR-PHEV EVOLUTION Vision Gran Turismo",
  "Mitsubishi FTO GP Version R '97",
  "Mitsubishi GTO Twin Turbo '91",
  "Mitsubishi Lancer Evolution Final '15",
  "Mitsubishi Lancer Evolution Final Gr.3",
  "Mitsubishi Lancer Evolution Final Gr.4",
  "Mitsubishi Lancer Evolution Final Gr.B Rally Car",
  "Mitsubishi Lancer Evolution Final Gr.B Road Car",
  "Mitsubishi Lancer Evolution III GSR '95",
  "Mitsubishi Lancer Evolution IV GSR '96",
  "Mitsubishi Lancer Evolution IX MR GSR '06",
  "Mitsubishi Lancer Evolution V GSR '98",
  "Mitsubishi Lancer Evolution VI GSR T.M. SCP '99",
  "Mitsubishi Lancer Evolution VIII MR GSR '04",

  // Nissan
  "Nissan 180SX Type X '96",
  "Nissan 400R '95",
  "Nissan Fairlady 240ZG (HS30) '71",
  "Nissan Fairlady Z (Z34) '08",
  "Nissan Fairlady Z 300ZX TT 2seater '89",
  "Nissan Fairlady Z 432 '69",
  "Nissan Fairlady Z Version S (Z33) '07",
  "Nissan GT-R '17",
  "Nissan GT-R GT500 '08",
  "Nissan GT-R GT500 '99",
  "Nissan GT-R Gr.4",
  "Nissan GT-R Gr.B Rally Car",
  "Nissan GT-R LM NISMO '15",
  "Nissan GT-R NISMO '17",
  "Nissan GT-R NISMO GT3 '13",
  "Nissan GT-R NISMO GT3 '18",
  "Nissan GT-R NISMO GT500 '16",
  "Nissan GT-R Premium edition T-spec '24",
  "Nissan GT-R Safety Car",
  "Nissan NISSAN CONCEPT 2020 Vision Gran Turismo",
  "Nissan Qashqai Tekna e-Power '22",
  "Nissan R32 GT-R NISMO '90",
  "Nissan R32 GT-R V·spec II '94",
  "Nissan R33 GT-R V·spec '97",
  "Nissan R34 GT-R V·spec II Nür '02",
  "Nissan R92CP '92",
  "Nissan Sileighty '98",
  "Nissan Silvia K's Aero (S14) '96",
  "Nissan Silvia K's Dia Selection (S13) '90",
  "Nissan Silvia K's Type S (S14) '94",
  "Nissan Silvia Q's (S13) '88",
  "Nissan Silvia spec-R Aero (S15) '02",
  "Nissan Silvia spec-R Aero (S15) Touring Car",
  "Nissan Skyline 2000GT-R (KPGC110) '73",
  "Nissan Skyline GTS-R (R31) '87",
  "Nissan Skyline Hard Top 2000GT-R (KPGC10) '70",
  "Nissan Skyline Super Silhouette '84",
  "Nissan Z Performance '23",

  // NISMO
  "NISMO R34 GT-R Z-tune '05",

  // Opel
  "Opel Corsa GSE Vision Gran Turismo",

  // Pagani
  "Pagani Huayra '13",
  "Pagani Zonda R '09",

  // Peugeot
  "Peugeot 205 GTI '88",
  "Peugeot 205 Turbo 16 Evolution 2 '86",
  "Peugeot 208 GTi by Peugeot Sport '14",
  "Peugeot 2008 Allure '21",
  "Peugeot 908 HDi FAP '10",
  "Peugeot L500R HYbrid Vision Gran Turismo 2017",
  "Peugeot L750R HYbrid Vision Gran Turismo 2017",
  "Peugeot PEUGEOT Vision Gran Turismo",
  "Peugeot PEUGEOT Vision Gran Turismo (Gr.3)",
  "Peugeot RCZ GT Line '15",
  "Peugeot RCZ Gr.3",
  "Peugeot RCZ Gr.3 Road Car",
  "Peugeot RCZ Gr.4",
  "Peugeot RCZ Gr.B Rally Car",

  // Plymouth
  "Plymouth Superbird '70",
  "Plymouth XNR Ghia Roadster '60",

  // Polestar
  "Polestar Polestar 5 Performance '26",

  // Pontiac
  "Pontiac Firebird Trans Am '78",
  "Pontiac GTO 'The Judge' '69",

  // Porsche
  "Porsche 356 A/1500 GS Carrera '56",
  "Porsche 356 A/1500 GS GT Carrera Speedster '56",
  "Porsche 911 Carrera RS (901) '73",
  "Porsche 911 Carrera RS (964) '92",
  "Porsche 911 Carrera RS (993) '95",
  "Porsche 911 Carrera RS CS (993) '95",
  "Porsche 911 GT1 Strassenversion '97",
  "Porsche 911 GT3 (996) '01",
  "Porsche 911 GT3 (997) '09",
  "Porsche 911 GT3 R (992) '22",
  "Porsche 911 GT3 RS (991) '16",
  "Porsche 911 GT3 RS (992) '22",
  "Porsche 911 RSR (991) '17",
  "Porsche 911 Turbo (930) '81",
  "Porsche 911 Turbo S (992) '20",
  "Porsche 917 LIVING LEGEND",
  "Porsche 917K '70",
  "Porsche 918 Spyder '13",
  "Porsche 919 Hybrid '16",
  "Porsche 959 '87",
  "Porsche 962 C '88",
  "Porsche Carrera GT '04",
  "Porsche Carrera GTS (904) '64",
  "Porsche Cayman GT4 '16",
  "Porsche Cayman GT4 Clubsport '16",
  "Porsche Mission X '23",
  "Porsche Porsche Vision Gran Turismo",
  "Porsche Porsche Vision Gran Turismo Spyder",
  "Porsche Spyder type 550/1500RS '55",
  "Porsche Taycan Turbo S '19",

  // Radical
  "Radical Merak SS '80",
  "Radical SR3 SL '13",

  // RE Amemiya
  "RE Amemiya FD3S RX-7",

  // Renault
  "Renault Avantime 3.0 V6 24V '02",
  "Renault Clio R.S. 220 Trophy '15",
  "Renault Clio R.S. 220 Trophy '16",
  "Renault Clio V6 24V '00",
  "Renault Espace F1 '95",
  "Renault Kangoo 1.4 '01",
  "Renault Mégane Gr.4",
  "Renault Mégane R.S. Trophy '11",
  "Renault Mégane R.S. Trophy Safety Car",
  "Renault Mégane Trophy '11",
  "Renault R.S.01 '16",
  "Renault R.S.01 GT3 '16",
  "Renault R4 GTL '85",
  "Renault R5 Turbo '80",
  "Renault R8 Gordini '66",

  // RUF
  "RUF CTR3 '07",
  "RUF RGT 4.2 '16",

  // Shelby
  "Shelby Cobra 427 '66",
  "Shelby Cobra Daytona Coupe '64",
  "Shelby G.T.350 '65",

  // Škoda
  "Škoda Škoda Vision Gran Turismo",

  // Subaru
  "Subaru BRZ Drift Car '17",
  "Subaru BRZ GT300 '21",
  "Subaru BRZ S '15",
  "Subaru BRZ S '21",
  "Subaru BRZ STI Sport '18",
  "Subaru Impreza 22B-STi '98",
  "Subaru Impreza Coupe WRX Type R STi Ver.VI '99",
  "Subaru Impreza Rally Car '98",
  "Subaru Impreza Sedan WRX STi '04",
  "Subaru VIZIV GT Vision Gran Turismo",
  "Subaru WRX Gr.3",
  "Subaru WRX Gr.4",
  "Subaru WRX Gr.B Rally Car",
  "Subaru WRX Gr.B Road Car",
  "Subaru WRX STI Isle of Man '16",
  "Subaru WRX STI Type S '14",

  // Super Formula
  "Super Formula SF19 Super Formula / Honda '19",
  "Super Formula SF19 Super Formula / Toyota '19",
  "Super Formula SF23 Super Formula / Honda '23",
  "Super Formula SF23 Super Formula / Toyota '23",

  // Suzuki
  "Suzuki Cappuccino '91",
  "Suzuki Carry KC '12",
  "Suzuki Jimny Sierra JC '18",
  "Suzuki Jimny XC '18",
  "Suzuki SUZUKI Vision Gran Turismo",
  "Suzuki SUZUKI Vision Gran Turismo (Gr.3)",
  "Suzuki Swift Sport '07",
  "Suzuki Swift Sport '17",
  "Suzuki Swift Sport Gr.4",
  "Suzuki V6 Escudo Pikes Peak Special '98",

  // Tesla
  "Tesla Model 3 Performance '23",
  "Tesla Model S Signature Performance '12",

  // Toyota
  "Toyota 2000GT '67",
  "Toyota 86 GRMN '16",
  "Toyota 86 GT '15",
  "Toyota 86 GT\"Limited\" '16",
  "Toyota 86 Gr.4",
  "Toyota 86 Gr.B Rally Car",
  "Toyota Alphard Executive Lounge '18",
  "Toyota Aqua S '11",
  "Toyota C-HR S '18",
  "Toyota Celica GT-FOUR Rally Car (ST205) '95",
  "Toyota Celica GT-Four (ST205) '94",
  "Toyota Corolla Levin 1600GT APEX (AE86) '83",
  "Toyota Crown Athlete G '13",
  "Toyota Crown Athlete G Safety Car",
  "Toyota FT-1",
  "Toyota FT-1 Vision Gran Turismo",
  "Toyota FT-1 Vision Gran Turismo (Gr.3)",
  "Toyota GR Corolla MORIZO Edition '22",
  "Toyota GR Supra RZ '19",
  "Toyota GR Supra RZ '20",
  "Toyota GR Supra Race Car '19",
  "Toyota GR Supra Racing Concept '18",
  "Toyota GR Yaris RZ \"High performance\" '20",
  "Toyota GR010 HYBRID '21",
  "Toyota GR86 RZ '21",
  "Toyota GT-One (TS020) '99",
  "Toyota Hiace Van DX '16",
  "Toyota Himedic '21",
  "Toyota Land Cruiser FJ40V '74",
  "Toyota Prius G '09",
  "Toyota RAV4 Adventure '20",
  "Toyota S-FR '15",
  "Toyota S-FR Racing Concept '16",
  "Toyota Sports 800 '65",
  "Toyota Sprinter Trueno 1600GT APEX (AE86) '83",
  "Toyota Sprinter Trueno 1600GT APEX (S.Shigeno Version)",
  "Toyota Supra 3.0GT Turbo A '88",
  "Toyota Supra GT500 '97",
  "Toyota Supra RZ '97",
  "Toyota TS030 Hybrid '12",
  "Toyota TS050 - Hybrid '16",
  "Toyota Tundra TRD Pro '19",

  // TVR
  "TVR Tuscan Speed 6 '00",

  // Volkswagen
  "Volkswagen Beetle Gr.3",
  "Volkswagen Golf I GTI '83",
  "Volkswagen Golf VII GTI '14",
  "Volkswagen GTI Roadster Vision Gran Turismo",
  "Volkswagen GTI Supersport Vision Gran Turismo",
  "Volkswagen GTI Vision Gran Turismo (Gr.3)",
  "Volkswagen ID.R '19",
  "Volkswagen Polo GTI '14",
  "Volkswagen Sambabus Typ 2 '62",
  "Volkswagen Scirocco Gr.4",
  "Volkswagen Scirocco R '10",
  "Volkswagen Volkswagen 1200 '66",

  // Volvo
  "Volvo 240 SE Estate '93",
  "Volvo V40 T5 R-Design '13",

  // Wicked Fabrication
  "Wicked Fabrication GT 51",

  // Xiaomi
  "Xiaomi SU7 Ultra '25",

  // Zagato
  "Zagato IsoRivolta Vision Gran Turismo",
]

// Multi-word manufacturer prefixes must be listed BEFORE their single-word prefix
// so the longer match wins (e.g. "Alfa Romeo" before "Alfa").
const MANUFACTURERS = [
  "Abarth", "AFEELA", "Alfa Romeo", "Alpine", "AMG", "Amuse",
  "Aston Martin", "Audi", "Autobianchi", "BAC", "BMW", "Bugatti",
  "BVLGARI", "Chaparral", "Chevrolet", "Chris Holstrom Concepts",
  "Citroën", "Daihatsu", "De Tomaso", "DMC", "Dodge",
  "DS Automobiles", "Eckert's Rod & Custom", "Ferrari", "Fiat",
  "Ford", "Garage RCR", "Genesis", "Gran Turismo", "Greddy",
  "Greening Auto Company", "Honda", "Hyundai", "Infiniti",
  "Italdesign", "Jaguar", "Jeep", "KTM", "Lamborghini", "Lancia",
  "Lexus", "Maserati", "Mazda", "McLaren", "Mercedes-Benz",
  "Mine's", "MINI", "Mitsubishi", "Nissan", "NISMO", "Opel",
  "Pagani", "Peugeot", "Plymouth", "Polestar", "Pontiac",
  "Porsche", "Radical", "RE Amemiya", "Renault", "RUF", "Shelby",
  "Škoda", "Subaru", "Super Formula", "Suzuki", "Tesla", "Toyota",
  "TVR", "Volkswagen", "Volvo", "Wicked Fabrication", "Xiaomi", "Zagato",
]

function getMake(carName) {
  for (const make of MANUFACTURERS) {
    if (carName.startsWith(make + ' ') || carName === make) return make
  }
  return carName.split(' ')[0]
}

// Build grouped options for react-select
const grouped = {}
for (const car of cars) {
  const make = getMake(car)
  if (!grouped[make]) grouped[make] = []
  grouped[make].push({ value: car, label: car })
}

// Flat list (for backend validation or simple use)
export const carList = cars.slice().sort()

// Grouped options for react-select
export default Object.entries(grouped)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([make, options]) => ({
    label: make,
    options: options.sort((a, b) => a.label.localeCompare(b.label)),
  }))
