namespace backend.Services.Interfaces
{
    public interface ISearchContext<T>
    {
        ISearchStrategy<T> GetStrategy(string key);
    }
}
