namespace YourTicket.API.Models
{
    public class Result<T> {
        public T Value { get; set; }
        public IEnumerable<Exception> Errors { get; set; }
        public bool IsSuccess  => Errors == null || !Errors.Any();

        public Result()
        {
            Errors = new List<Exception>();
        }
    }
}