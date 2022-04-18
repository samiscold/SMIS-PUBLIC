using Microsoft.EntityFrameworkCore;
namespace Persistance
{
    public class DataContext : DbContext
    {
        public DataContextDbContextOptions options) : base(options)
        {
        }
    }
}