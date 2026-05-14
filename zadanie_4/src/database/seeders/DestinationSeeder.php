<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destination;
use App\Models\DestinationClimate;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = [
            [
                'name' => 'Dubrovnik', 'country' => 'Chorvátsko', 'country_code' => 'hr',
                'capital' => 'Záhreb', 'currency_code' => 'EUR',
                'flight_hours_from_vienna' => 1.5, 'lat' => 42.65, 'lon' => 18.09,
                'types' => ['more', 'historicke'],
                'climate' => [
                    1=>['avg'=>10,'min'=>7,'max'=>13], 2=>['avg'=>11,'min'=>8,'max'=>14],
                    3=>['avg'=>13,'min'=>10,'max'=>17], 4=>['avg'=>17,'min'=>13,'max'=>21],
                    5=>['avg'=>21,'min'=>17,'max'=>25], 6=>['avg'=>25,'min'=>21,'max'=>29],
                    7=>['avg'=>28,'min'=>24,'max'=>32], 8=>['avg'=>28,'min'=>24,'max'=>32],
                    9=>['avg'=>24,'min'=>20,'max'=>28], 10=>['avg'=>19,'min'=>15,'max'=>23],
                    11=>['avg'=>15,'min'=>11,'max'=>18], 12=>['avg'=>11,'min'=>8,'max'=>14],
                ],
            ],
            [
                'name' => 'Barcelona', 'country' => 'Španielsko', 'country_code' => 'es',
                'capital' => 'Madrid', 'currency_code' => 'EUR',
                'flight_hours_from_vienna' => 2.5, 'lat' => 41.39, 'lon' => 2.15,
                'types' => ['more', 'historicke', 'mestsky'],
                'climate' => [
                    1=>['avg'=>10,'min'=>7,'max'=>13], 2=>['avg'=>11,'min'=>8,'max'=>14],
                    3=>['avg'=>13,'min'=>10,'max'=>16], 4=>['avg'=>16,'min'=>13,'max'=>19],
                    5=>['avg'=>19,'min'=>16,'max'=>23], 6=>['avg'=>23,'min'=>20,'max'=>27],
                    7=>['avg'=>26,'min'=>23,'max'=>30], 8=>['avg'=>26,'min'=>23,'max'=>30],
                    9=>['avg'=>23,'min'=>20,'max'=>27], 10=>['avg'=>19,'min'=>16,'max'=>23],
                    11=>['avg'=>14,'min'=>11,'max'=>17], 12=>['avg'=>11,'min'=>8,'max'=>14],
                ],
            ],
            [
                'name' => 'Praha', 'country' => 'Česko', 'country_code' => 'cz',
                'capital' => 'Praha', 'currency_code' => 'CZK',
                'flight_hours_from_vienna' => 1.0, 'lat' => 50.08, 'lon' => 14.44,
                'types' => ['historicke', 'mestsky'],
                'climate' => [
                    1=>['avg'=>0,'min'=>-3,'max'=>3], 2=>['avg'=>2,'min'=>-2,'max'=>5],
                    3=>['avg'=>7,'min'=>2,'max'=>11], 4=>['avg'=>12,'min'=>7,'max'=>17],
                    5=>['avg'=>17,'min'=>12,'max'=>22], 6=>['avg'=>20,'min'=>15,'max'=>25],
                    7=>['avg'=>22,'min'=>17,'max'=>27], 8=>['avg'=>22,'min'=>17,'max'=>27],
                    9=>['avg'=>17,'min'=>12,'max'=>22], 10=>['avg'=>12,'min'=>7,'max'=>16],
                    11=>['avg'=>6,'min'=>2,'max'=>9], 12=>['avg'=>1,'min'=>-2,'max'=>4],
                ],
            ],
            [
                'name' => 'Santorini', 'country' => 'Grécko', 'country_code' => 'gr',
                'capital' => 'Atény', 'currency_code' => 'EUR',
                'flight_hours_from_vienna' => 2.5, 'lat' => 36.39, 'lon' => 25.46,
                'types' => ['more', 'mestsky'],
                'climate' => [
                    1=>['avg'=>12,'min'=>9,'max'=>15], 2=>['avg'=>12,'min'=>9,'max'=>15],
                    3=>['avg'=>14,'min'=>11,'max'=>17], 4=>['avg'=>18,'min'=>14,'max'=>21],
                    5=>['avg'=>22,'min'=>18,'max'=>26], 6=>['avg'=>26,'min'=>22,'max'=>30],
                    7=>['avg'=>29,'min'=>25,'max'=>33], 8=>['avg'=>29,'min'=>25,'max'=>33],
                    9=>['avg'=>26,'min'=>22,'max'=>30], 10=>['avg'=>21,'min'=>18,'max'=>25],
                    11=>['avg'=>17,'min'=>14,'max'=>20], 12=>['avg'=>13,'min'=>10,'max'=>16],
                ],
            ],
            [
                'name' => 'Rím', 'country' => 'Taliansko', 'country_code' => 'it',
                'capital' => 'Rím', 'currency_code' => 'EUR',
                'flight_hours_from_vienna' => 1.5, 'lat' => 41.90, 'lon' => 12.50,
                'types' => ['historicke', 'mestsky'],
                'climate' => [
                    1=>['avg'=>8,'min'=>4,'max'=>12], 2=>['avg'=>9,'min'=>5,'max'=>13],
                    3=>['avg'=>12,'min'=>8,'max'=>16], 4=>['avg'=>16,'min'=>12,'max'=>20],
                    5=>['avg'=>21,'min'=>16,'max'=>25], 6=>['avg'=>25,'min'=>20,'max'=>30],
                    7=>['avg'=>28,'min'=>23,'max'=>33], 8=>['avg'=>28,'min'=>23,'max'=>33],
                    9=>['avg'=>24,'min'=>19,'max'=>29], 10=>['avg'=>18,'min'=>14,'max'=>23],
                    11=>['avg'=>13,'min'=>9,'max'=>17], 12=>['avg'=>9,'min'=>5,'max'=>13],
                ],
            ],
            [
                'name' => 'Zakopané', 'country' => 'Poľsko', 'country_code' => 'pl',
                'capital' => 'Varšava', 'currency_code' => 'PLN',
                'flight_hours_from_vienna' => 1.0, 'lat' => 49.30, 'lon' => 19.95,
                'types' => ['hory', 'aktivita'],
                'climate' => [
                    1=>['avg'=>-5,'min'=>-9,'max'=>-1], 2=>['avg'=>-4,'min'=>-8,'max'=>0],
                    3=>['avg'=>0,'min'=>-4,'max'=>4], 4=>['avg'=>7,'min'=>3,'max'=>11],
                    5=>['avg'=>12,'min'=>8,'max'=>16], 6=>['avg'=>15,'min'=>11,'max'=>19],
                    7=>['avg'=>17,'min'=>13,'max'=>21], 8=>['avg'=>17,'min'=>13,'max'=>21],
                    9=>['avg'=>13,'min'=>9,'max'=>17], 10=>['avg'=>8,'min'=>4,'max'=>12],
                    11=>['avg'=>2,'min'=>-2,'max'=>5], 12=>['avg'=>-3,'min'=>-7,'max'=>0],
                ],
            ],
            [
                'name' => 'Marrakech', 'country' => 'Maroko', 'country_code' => 'ma',
                'capital' => 'Rabat', 'currency_code' => 'MAD',
                'flight_hours_from_vienna' => 4.0, 'lat' => 31.63, 'lon' => -8.00,
                'types' => ['historicke', 'aktivita', 'mestsky'],
                'climate' => [
                    1=>['avg'=>12,'min'=>4,'max'=>20], 2=>['avg'=>14,'min'=>6,'max'=>22],
                    3=>['avg'=>17,'min'=>9,'max'=>26], 4=>['avg'=>21,'min'=>12,'max'=>30],
                    5=>['avg'=>25,'min'=>16,'max'=>34], 6=>['avg'=>30,'min'=>20,'max'=>39],
                    7=>['avg'=>35,'min'=>23,'max'=>43], 8=>['avg'=>34,'min'=>22,'max'=>42],
                    9=>['avg'=>29,'min'=>18,'max'=>37], 10=>['avg'=>23,'min'=>13,'max'=>31],
                    11=>['avg'=>17,'min'=>8,'max'=>25], 12=>['avg'=>13,'min'=>5,'max'=>21],
                ],
            ],
            [
                'name' => 'Amsterdam', 'country' => 'Holandsko', 'country_code' => 'nl',
                'capital' => 'Amsterdam', 'currency_code' => 'EUR',
                'flight_hours_from_vienna' => 2.0, 'lat' => 52.37, 'lon' => 4.90,
                'types' => ['mestsky', 'historicke'],
                'climate' => [
                    1=>['avg'=>4,'min'=>1,'max'=>6], 2=>['avg'=>4,'min'=>1,'max'=>7],
                    3=>['avg'=>7,'min'=>3,'max'=>10], 4=>['avg'=>11,'min'=>7,'max'=>14],
                    5=>['avg'=>15,'min'=>10,'max'=>18], 6=>['avg'=>17,'min'=>13,'max'=>21],
                    7=>['avg'=>19,'min'=>15,'max'=>23], 8=>['avg'=>20,'min'=>15,'max'=>24],
                    9=>['avg'=>17,'min'=>13,'max'=>21], 10=>['avg'=>13,'min'=>9,'max'=>16],
                    11=>['avg'=>8,'min'=>5,'max'=>11], 12=>['avg'=>5,'min'=>2,'max'=>7],
                ],
            ],
            [
                'name' => 'Dubaj', 'country' => 'SAE', 'country_code' => 'ae',
                'capital' => 'Abú Zabí', 'currency_code' => 'AED',
                'flight_hours_from_vienna' => 6.0, 'lat' => 25.20, 'lon' => 55.27,
                'types' => ['more', 'mestsky', 'aktivita'],
                'climate' => [
                    1=>['avg'=>19,'min'=>14,'max'=>24], 2=>['avg'=>21,'min'=>15,'max'=>26],
                    3=>['avg'=>24,'min'=>18,'max'=>30], 4=>['avg'=>29,'min'=>22,'max'=>35],
                    5=>['avg'=>33,'min'=>26,'max'=>40], 6=>['avg'=>35,'min'=>28,'max'=>42],
                    7=>['avg'=>37,'min'=>30,'max'=>43], 8=>['avg'=>38,'min'=>30,'max'=>44],
                    9=>['avg'=>34,'min'=>27,'max'=>41], 10=>['avg'=>30,'min'=>23,'max'=>37],
                    11=>['avg'=>25,'min'=>19,'max'=>31], 12=>['avg'=>21,'min'=>15,'max'=>26],
                ],
            ],
            [
                'name' => 'Lisabon', 'country' => 'Portugalsko', 'country_code' => 'pt',
                'capital' => 'Lisabon', 'currency_code' => 'EUR',
                'flight_hours_from_vienna' => 3.5, 'lat' => 38.72, 'lon' => -9.14,
                'types' => ['more', 'historicke', 'mestsky'],
                'climate' => [
                    1=>['avg'=>12,'min'=>8,'max'=>15], 2=>['avg'=>13,'min'=>9,'max'=>16],
                    3=>['avg'=>15,'min'=>11,'max'=>18], 4=>['avg'=>17,'min'=>13,'max'=>21],
                    5=>['avg'=>20,'min'=>15,'max'=>24], 6=>['avg'=>23,'min'=>18,'max'=>27],
                    7=>['avg'=>26,'min'=>20,'max'=>31], 8=>['avg'=>27,'min'=>21,'max'=>32],
                    9=>['avg'=>25,'min'=>19,'max'=>30], 10=>['avg'=>20,'min'=>15,'max'=>24],
                    11=>['avg'=>16,'min'=>11,'max'=>19], 12=>['avg'=>13,'min'=>9,'max'=>16],
                ],
            ],
            [
                'name' => 'Reykjavík', 'country' => 'Island', 'country_code' => 'is',
                'capital' => 'Reykjavík', 'currency_code' => 'ISK',
                'flight_hours_from_vienna' => 4.0, 'lat' => 64.13, 'lon' => -21.82,
                'types' => ['hory', 'aktivita'],
                'climate' => [
                    1=>['avg'=>0,'min'=>-3,'max'=>3], 2=>['avg'=>1,'min'=>-2,'max'=>3],
                    3=>['avg'=>2,'min'=>-1,'max'=>4], 4=>['avg'=>5,'min'=>2,'max'=>8],
                    5=>['avg'=>9,'min'=>5,'max'=>12], 6=>['avg'=>12,'min'=>8,'max'=>15],
                    7=>['avg'=>13,'min'=>10,'max'=>17], 8=>['avg'=>13,'min'=>10,'max'=>16],
                    9=>['avg'=>10,'min'=>7,'max'=>13], 10=>['avg'=>6,'min'=>3,'max'=>9],
                    11=>['avg'=>3,'min'=>0,'max'=>5], 12=>['avg'=>1,'min'=>-2,'max'=>4],
                ],
            ],
            [
                'name' => 'Bangkok', 'country' => 'Thajsko', 'country_code' => 'th',
                'capital' => 'Bangkok', 'currency_code' => 'THB',
                'flight_hours_from_vienna' => 11.0, 'lat' => 13.75, 'lon' => 100.52,
                'types' => ['more', 'historicke', 'mestsky', 'aktivita'],
                'climate' => [
                    1=>['avg'=>27,'min'=>22,'max'=>32], 2=>['avg'=>29,'min'=>24,'max'=>34],
                    3=>['avg'=>31,'min'=>26,'max'=>36], 4=>['avg'=>33,'min'=>27,'max'=>38],
                    5=>['avg'=>31,'min'=>26,'max'=>35], 6=>['avg'=>30,'min'=>25,'max'=>34],
                    7=>['avg'=>29,'min'=>25,'max'=>33], 8=>['avg'=>29,'min'=>25,'max'=>33],
                    9=>['avg'=>29,'min'=>25,'max'=>33], 10=>['avg'=>28,'min'=>24,'max'=>32],
                    11=>['avg'=>28,'min'=>23,'max'=>32], 12=>['avg'=>27,'min'=>22,'max'=>31],
                ],
            ],
            [
                'name' => 'Viedeň', 'country' => 'Rakúsko', 'country_code' => 'at',
                'capital' => 'Viedeň', 'currency_code' => 'EUR',
                'flight_hours_from_vienna' => 0.0, 'lat' => 48.21, 'lon' => 16.37,
                'types' => ['historicke', 'mestsky'],
                'climate' => [
                    1=>['avg'=>1,'min'=>-3,'max'=>4], 2=>['avg'=>3,'min'=>-1,'max'=>6],
                    3=>['avg'=>8,'min'=>3,'max'=>13], 4=>['avg'=>14,'min'=>8,'max'=>19],
                    5=>['avg'=>19,'min'=>13,'max'=>24], 6=>['avg'=>22,'min'=>16,'max'=>27],
                    7=>['avg'=>24,'min'=>18,'max'=>29], 8=>['avg'=>24,'min'=>18,'max'=>29],
                    9=>['avg'=>19,'min'=>13,'max'=>24], 10=>['avg'=>13,'min'=>8,'max'=>18],
                    11=>['avg'=>7,'min'=>3,'max'=>11], 12=>['avg'=>2,'min'=>-1,'max'=>5],
                ],
            ],
            [
                'name' => 'Paríž', 'country' => 'Francúzsko', 'country_code' => 'fr',
                'capital' => 'Paríž', 'currency_code' => 'EUR',
                'flight_hours_from_vienna' => 2.0, 'lat' => 48.86, 'lon' => 2.35,
                'types' => ['historicke', 'mestsky'],
                'climate' => [
                    1=>['avg'=>5,'min'=>2,'max'=>8], 2=>['avg'=>6,'min'=>2,'max'=>10],
                    3=>['avg'=>10,'min'=>5,'max'=>14], 4=>['avg'=>13,'min'=>8,'max'=>18],
                    5=>['avg'=>17,'min'=>12,'max'=>22], 6=>['avg'=>20,'min'=>15,'max'=>25],
                    7=>['avg'=>23,'min'=>17,'max'=>28], 8=>['avg'=>23,'min'=>17,'max'=>28],
                    9=>['avg'=>19,'min'=>14,'max'=>24], 10=>['avg'=>14,'min'=>10,'max'=>19],
                    11=>['avg'=>9,'min'=>5,'max'=>13], 12=>['avg'=>6,'min'=>2,'max'=>9],
                ],
            ],
            [
                'name' => 'Zermatt', 'country' => 'Švajčiarsko', 'country_code' => 'ch',
                'capital' => 'Bern', 'currency_code' => 'CHF',
                'flight_hours_from_vienna' => 1.5, 'lat' => 46.02, 'lon' => 7.75,
                'types' => ['hory', 'aktivita'],
                'climate' => [
                    1=>['avg'=>-7,'min'=>-12,'max'=>-2], 2=>['avg'=>-6,'min'=>-11,'max'=>-1],
                    3=>['avg'=>-3,'min'=>-8,'max'=>2], 4=>['avg'=>2,'min'=>-3,'max'=>7],
                    5=>['avg'=>7,'min'=>2,'max'=>12], 6=>['avg'=>11,'min'=>6,'max'=>16],
                    7=>['avg'=>14,'min'=>9,'max'=>19], 8=>['avg'=>14,'min'=>9,'max'=>18],
                    9=>['avg'=>10,'min'=>5,'max'=>15], 10=>['avg'=>4,'min'=>0,'max'=>9],
                    11=>['avg'=>-2,'min'=>-6,'max'=>2], 12=>['avg'=>-6,'min'=>-10,'max'=>-1],
                ],
            ],
            [
                'name' => 'Maldivy', 'country' => 'Maldivy', 'country_code' => 'mv',
                'capital' => 'Malé', 'currency_code' => 'MVR',
                'flight_hours_from_vienna' => 10.0, 'lat' => 3.20, 'lon' => 73.22,
                'types' => ['more', 'aktivita'],
                'climate' => [
                    1=>['avg'=>29,'min'=>26,'max'=>31], 2=>['avg'=>29,'min'=>26,'max'=>31],
                    3=>['avg'=>30,'min'=>27,'max'=>32], 4=>['avg'=>30,'min'=>27,'max'=>32],
                    5=>['avg'=>29,'min'=>26,'max'=>31], 6=>['avg'=>28,'min'=>26,'max'=>30],
                    7=>['avg'=>28,'min'=>25,'max'=>30], 8=>['avg'=>28,'min'=>25,'max'=>30],
                    9=>['avg'=>28,'min'=>26,'max'=>30], 10=>['avg'=>29,'min'=>26,'max'=>31],
                    11=>['avg'=>29,'min'=>26,'max'=>31], 12=>['avg'=>29,'min'=>26,'max'=>31],
                ],
            ],
            [
                'name' => 'Kyoto', 'country' => 'Japonsko', 'country_code' => 'jp',
                'capital' => 'Tokio', 'currency_code' => 'JPY',
                'flight_hours_from_vienna' => 12.0, 'lat' => 35.01, 'lon' => 135.77,
                'types' => ['historicke', 'mestsky', 'aktivita'],
                'climate' => [
                    1=>['avg'=>5,'min'=>1,'max'=>9], 2=>['avg'=>6,'min'=>2,'max'=>11],
                    3=>['avg'=>10,'min'=>5,'max'=>15], 4=>['avg'=>16,'min'=>11,'max'=>21],
                    5=>['avg'=>21,'min'=>16,'max'=>26], 6=>['avg'=>24,'min'=>20,'max'=>29],
                    7=>['avg'=>28,'min'=>24,'max'=>33], 8=>['avg'=>30,'min'=>25,'max'=>34],
                    9=>['avg'=>25,'min'=>21,'max'=>30], 10=>['avg'=>19,'min'=>14,'max'=>24],
                    11=>['avg'=>13,'min'=>8,'max'=>18], 12=>['avg'=>7,'min'=>3,'max'=>12],
                ],
            ],
            [
                'name' => 'New York', 'country' => 'USA', 'country_code' => 'us',
                'capital' => 'Washington D.C.', 'currency_code' => 'USD',
                'flight_hours_from_vienna' => 9.0, 'lat' => 40.71, 'lon' => -74.01,
                'types' => ['mestsky', 'aktivita'],
                'climate' => [
                    1=>['avg'=>1,'min'=>-3,'max'=>4], 2=>['avg'=>2,'min'=>-2,'max'=>6],
                    3=>['avg'=>7,'min'=>2,'max'=>12], 4=>['avg'=>13,'min'=>8,'max'=>18],
                    5=>['avg'=>19,'min'=>13,'max'=>24], 6=>['avg'=>24,'min'=>18,'max'=>29],
                    7=>['avg'=>27,'min'=>22,'max'=>32], 8=>['avg'=>26,'min'=>21,'max'=>31],
                    9=>['avg'=>22,'min'=>17,'max'=>27], 10=>['avg'=>16,'min'=>11,'max'=>21],
                    11=>['avg'=>10,'min'=>5,'max'=>14], 12=>['avg'=>3,'min'=>-1,'max'=>8],
                ],
            ],
            [
                'name' => 'Kapské Mesto', 'country' => 'Južná Afrika', 'country_code' => 'za',
                'capital' => 'Pretória', 'currency_code' => 'ZAR',
                'flight_hours_from_vienna' => 11.0, 'lat' => -33.93, 'lon' => 18.42,
                'types' => ['more', 'hory', 'aktivita'],
                'climate' => [
                    1=>['avg'=>22,'min'=>17,'max'=>27], 2=>['avg'=>22,'min'=>17,'max'=>27],
                    3=>['avg'=>21,'min'=>16,'max'=>26], 4=>['avg'=>18,'min'=>13,'max'=>23],
                    5=>['avg'=>15,'min'=>10,'max'=>19], 6=>['avg'=>13,'min'=>8,'max'=>17],
                    7=>['avg'=>12,'min'=>7,'max'=>16], 8=>['avg'=>13,'min'=>8,'max'=>17],
                    9=>['avg'=>15,'min'=>10,'max'=>19], 10=>['avg'=>17,'min'=>12,'max'=>22],
                    11=>['avg'=>19,'min'=>14,'max'=>24], 12=>['avg'=>21,'min'=>16,'max'=>26],
                ],
            ],
            [
                'name' => 'Tallinn', 'country' => 'Estónsko', 'country_code' => 'ee',
                'capital' => 'Tallinn', 'currency_code' => 'EUR',
                'flight_hours_from_vienna' => 2.5, 'lat' => 59.44, 'lon' => 24.75,
                'types' => ['historicke', 'mestsky'],
                'climate' => [
                    1=>['avg'=>-4,'min'=>-8,'max'=>-1], 2=>['avg'=>-5,'min'=>-9,'max'=>-1],
                    3=>['avg'=>-1,'min'=>-5,'max'=>3], 4=>['avg'=>6,'min'=>2,'max'=>10],
                    5=>['avg'=>13,'min'=>8,'max'=>17], 6=>['avg'=>17,'min'=>12,'max'=>21],
                    7=>['avg'=>19,'min'=>14,'max'=>23], 8=>['avg'=>18,'min'=>14,'max'=>22],
                    9=>['avg'=>13,'min'=>9,'max'=>17], 10=>['avg'=>8,'min'=>4,'max'=>11],
                    11=>['avg'=>3,'min'=>0,'max'=>6], 12=>['avg'=>-1,'min'=>-5,'max'=>2],
                ],
            ],
        ];

        foreach ($destinations as $data) {
            $climate = $data['climate'];
            unset($data['climate']);

            $dest = Destination::create($data);

            foreach ($climate as $month => $temps) {
                DestinationClimate::create([
                    'destination_id' => $dest->id,
                    'month' => $month,
                    'temp_avg' => $temps['avg'],
                    'temp_min' => $temps['min'],
                    'temp_max' => $temps['max'],
                ]);
            }
        }
    }
}