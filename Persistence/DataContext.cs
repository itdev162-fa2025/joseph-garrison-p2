using Domain;
using Microsoft.EntityFrameworkCore;
 
namespace Persistence
{
    public class DataContext: DbContext
    {
        public DbSet<Color> Colors { get; set; }
        public string DbPath { get; }
 
        public DataContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "ColoHexCode.db");
        }
 
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite($"Data Source={DbPath}");
        }
    }
}
