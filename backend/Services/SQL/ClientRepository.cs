using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.SQL
{
    public class ClientRepository : IClientRepository
    {
        private const int RESULTS_PER_PAGE = 10;
        private readonly OrtSqlContext _dbContext;
        private readonly ISearchContext<Client> _searchContext;

        public ClientRepository(OrtSqlContext dbContext, ISearchContext<Client> searchContext)
        {
            _dbContext = dbContext;
            _searchContext = searchContext;
        }

        public async Task<IEnumerable<Client>> Get(int page)
            => await _dbContext.Clients.Skip((page - 1) * RESULTS_PER_PAGE).Take(RESULTS_PER_PAGE).ToListAsync();

        public async Task<IEnumerable<Client>> Get(int page, string searchField, string searchTerm)
        {
            var query = _searchContext.GetStrategy(searchField).Search(_dbContext.Clients, searchTerm);
            return await query!.Skip((page - 1) * RESULTS_PER_PAGE).Take(RESULTS_PER_PAGE).ToListAsync();

            //// This is not how searching should be done, I ran out of time
            //switch (searchField.ToLower())
            //{
            //    case "id":
            //        query = query.Where(c => c.ID.StartsWith(searchTerm));
            //        break;
            //    case "firstname":
            //        query = query.Where(c => c.FirstName.StartsWith(searchTerm));
            //        break;
            //    case "lastname":
            //        query = query.Where(c => c.LastName.StartsWith(searchTerm));
            //        break;
            //    case "ip":
            //        query = query.Where(c => c.IP.StartsWith(searchTerm));
            //        break;
            //    case "phonenumber":
            //        query = query.Where(c => c.Phone.StartsWith(searchTerm));
            //        break;
            //    default:
            //        throw new ArgumentException("Invalid search field.");
            //}

        }

        public async Task<Client?> Get(string id)
            => await _dbContext.Clients.FirstOrDefaultAsync(c => c.ID == id);

        public async Task<bool> Upsert(Client model)
        {
            var existing = await Get(model.ID);
            if (existing == null)
                await _dbContext.Clients.AddAsync(model);
            else
            {
                existing.FirstName = model.FirstName;
                existing.LastName = model.LastName;
                existing.IP = model.IP;
                existing.Phone = model.Phone;
            }

            return (await _dbContext.SaveChangesAsync()) > 0;
        }

        public async Task<bool> Delete(string id)
        {
            var existing = await Get(id);
            if (existing == null)
                return false;

            _dbContext.Clients.Remove(existing);
            return (await _dbContext.SaveChangesAsync()) > 0;
        }
    }
}