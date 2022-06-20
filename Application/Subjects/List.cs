using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Subjects
{
    public class List
    {
        public class Query : IRequest<List<Subject>> { }

        public class Handler : IRequestHandler<Query, List<Subject>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Subject>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Subjects.ToListAsync();
            }
        }
    }
} 