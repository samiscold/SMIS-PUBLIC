using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Subjects
{
    public class Details
    {
        public class Query : IRequest<Subject>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Subject>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Subject> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Subjects.FindAsync(request.Id);
            }
        }
    }
} 