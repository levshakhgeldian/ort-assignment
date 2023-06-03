namespace backend.Services.Interfaces
{
    public interface ISearchStrategy<T>
    {
        IQueryable<T> Search(IQueryable<T> collection, string value, bool exactMatch = false);
    }
}
