using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context) {
            if(context.Countries.Any()) return;

            var countries = new List<Country>{
                new Country {
                    Name = "Albania",
                    CountryCode = "AL"
                },
                new Country {
                    Name = "Kosova",
                    CountryCode = "XK"
                },
                new Country {
                    Name = "Germany",
                    CountryCode = "DE"
                }
            };
            
            await context.Countries.AddRangeAsync(countries);
            await context.SaveChangesAsync();
        }
    }
}