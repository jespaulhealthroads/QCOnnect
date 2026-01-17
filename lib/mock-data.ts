// Bitfocus GraphQL API Mock Response Structure
export interface EnrollmentNode {
  uniqueId: string
  enrollmentDate: string
  program: {
    name: string
    type: string
  }
  services: {
    code: string
    date: string
    status: string
  }[]
  client: {
    firstName: string
    lastName: string
    dateOfBirth: string
  }
  project: {
    name: string
    projectType: string
  }
}

export interface GraphQLResponse {
  data: {
    enrollments: {
      edges: {
        node: EnrollmentNode
      }[]
      pageInfo: {
        hasNextPage: boolean
        endCursor: string
      }
    }
  }
}

// Mock Bitfocus Clarity GraphQL Response
export const mockGraphQLResponse: GraphQLResponse = {
  data: {
    enrollments: {
      edges: [
        {
          node: {
            uniqueId: "998877",
            enrollmentDate: "2026-01-10",
            program: {
              name: "Street Outreach Program",
              type: "Street Outreach",
            },
            services: [
              { code: "H-NAV", date: "2026-01-14", status: "COMPLETED" },
              { code: "H-ASSESS", date: "2026-01-12", status: "COMPLETED" },
            ],
            client: {
              firstName: "John",
              lastName: "Doe",
              dateOfBirth: "1985-03-15",
            },
            project: {
              name: "Downtown Outreach Initiative",
              projectType: "SO",
            },
          },
        },
        {
          node: {
            uniqueId: "998878",
            enrollmentDate: "2026-01-08",
            program: {
              name: "Coordinated Entry System",
              type: "Coordinated Entry",
            },
            services: [
              { code: "CE-ASSESS", date: "2026-01-14", status: "COMPLETED" },
              { code: "VI-SPDAT", date: "2026-01-13", status: "PENDING_REVIEW" },
            ],
            client: {
              firstName: "Maria",
              lastName: "Smith",
              dateOfBirth: "1990-07-22",
            },
            project: {
              name: "County CE Hub",
              projectType: "CE",
            },
          },
        },
        {
          node: {
            uniqueId: "998879",
            enrollmentDate: "2026-01-05",
            program: {
              name: "Rapid Re-Housing",
              type: "Street Outreach",
            },
            services: [{ code: "H-MOVE", date: "2026-01-15", status: "SCHEDULED" }],
            client: {
              firstName: "Robert",
              lastName: "Johnson",
              dateOfBirth: "1978-11-30",
            },
            project: {
              name: "Family Housing First",
              projectType: "RRH",
            },
          },
        },
        {
          node: {
            uniqueId: "998880",
            enrollmentDate: "2026-01-12",
            program: {
              name: "Emergency Shelter",
              type: "Coordinated Entry",
            },
            services: [{ code: "ES-BED", date: "2026-01-14", status: "ACTIVE" }],
            client: {
              firstName: "Sarah",
              lastName: "Williams",
              dateOfBirth: "1992-05-18",
            },
            project: {
              name: "City Emergency Shelter",
              projectType: "ES",
            },
          },
        },
      ],
      pageInfo: {
        hasNextPage: false,
        endCursor: "cursor_998880",
      },
    },
  },
}

// GraphQL Query string for display
export const graphQLQueryString = `QUERY: {
  enrollments(status: ACTIVE) {
    edges {
      node {
        id
        client { firstName, lastName }
        project { name }
      }
    }
  }
}`

// Transform mock data to outbound table format
export function transformToOutboundData(response: GraphQLResponse) {
  return response.data.enrollments.edges.map((edge) => {
    const node = edge.node
    const isOutreach = node.program.type === "Street Outreach"
    const latestService = node.services[0]

    return {
      clarityId: `#${node.uniqueId}`,
      clientName: `${node.client.firstName.charAt(0)}. ${node.client.lastName}`,
      module: isOutreach ? "Outreach" : "Coordinated Entry",
      serviceType: getServiceTypeName(latestService.code),
      status: getTransformStatus(latestService.status),
      statusColor: latestService.status === "COMPLETED" ? "emerald" : "amber",
    }
  })
}

function getServiceTypeName(code: string): string {
  const serviceNames: Record<string, string> = {
    "H-NAV": "Housing Navigation",
    "H-ASSESS": "Housing Assessment",
    "CE-ASSESS": "CE Assessment",
    "VI-SPDAT": "VI-SPDAT Assessment",
    "H-MOVE": "Move-In Assistance",
    "ES-BED": "Emergency Shelter Bed",
  }
  return serviceNames[code] || code
}

function getTransformStatus(status: string): string {
  const statusMap: Record<string, string> = {
    COMPLETED: "Transformed to 837 Claim",
    PENDING_REVIEW: "Queued for Billing",
    SCHEDULED: "Awaiting Service Date",
    ACTIVE: "In Progress",
  }
  return statusMap[status] || status
}
