using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IClientRepository
    {
        Task<IEnumerable<Client>> Get(int page);
        Task<IEnumerable<Client>> Get(int page, string searchField, string searchTerm);
        Task<Client?> Get(string id);
        Task<bool> Upsert(Client model);
        Task<bool> Delete(string id);
    }
}