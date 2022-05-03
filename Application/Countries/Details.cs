using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Countries
{
    public class Details
    {
        public class Query : IRequest<Country>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Country>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Country> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Countries.FindAsync(request.Id);
            }
        }
    }
}