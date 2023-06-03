using backend.Models;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class ClientSearchContext : ISearchContext<Client>
    {
        public class IdSearchStrategy : ISearchStrategy<Client>
        {
            public IQueryable<Client> Search(IQueryable<Client> collection, string value, bool exactMatch = false)
            {
                if (exactMatch)
                    return collection.Where(c => c.ID.Equals(value));

                value = value.ToLower();
                return collection.Where(c => c.ID.ToLower().StartsWith(value));
            }
        }
        public class FirstNameSearchStrategy : ISearchStrategy<Client>
        {
            public IQueryable<Client> Search(IQueryable<Client> collection, string value, bool exactMatch = false)
            {
                if (exactMatch)
                    return collection.Where(c => c.FirstName.Equals(value));

                value = value.ToLower();
                return collection.Where(c => c.FirstName.ToLower().StartsWith(value));
            }
        }
        public class LastNameSearchStrategy : ISearchStrategy<Client>
        {
            public IQueryable<Client> Search(IQueryable<Client> collection, string value, bool exactMatch = false)
            {
                if (exactMatch)
                    return collection.Where(c => c.LastName.Equals(value));

                value = value.ToLower();
                return collection.Where(c => c.LastName.ToLower().StartsWith(value));
            }
        }
        public class IpSearchStrategy : ISearchStrategy<Client>
        {
            public IQueryable<Client> Search(IQueryable<Client> collection, string value, bool exactMatch = false)
            {
                if (exactMatch)
                    return collection.Where(c => c.IP.Equals(value));

                return collection.Where(c => c.IP.StartsWith(value));
            }
        }
        public class PhoneSearchStrategy : ISearchStrategy<Client>
        {
            public IQueryable<Client> Search(IQueryable<Client> collection, string value, bool exactMatch = false)
            {
                if (exactMatch)
                    return collection.Where(c => c.Phone.Equals(value));

                return collection.Where(c => c.Phone.StartsWith(value));
            }
        }

        public ISearchStrategy<Client> GetStrategy(string key)
        {
            switch (key.ToLower())
            {
                case "id":
                    return new IdSearchStrategy();
                case "firstname":
                    return new FirstNameSearchStrategy();
                case "lastname":
                    return new LastNameSearchStrategy();
                case "ip":
                    return new IpSearchStrategy();
                case "phone":
                    return new PhoneSearchStrategy();
            }

            throw new ArgumentException($"No search strategy exists for {key} in {nameof(ClientSearchContext)}");
        }
    }
}