import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, Equal } from "lucide-react"
import type { DiffStats } from "@/types/diff"

interface DiffStatsProps {
  stats: DiffStats
}

export function DiffStatsComponent({ stats }: DiffStatsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-green-600" />
            <Badge variant="outline" className="text-green-600 border-green-600">
              +{stats.additions} additions
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Minus className="w-4 h-4 text-red-600" />
            <Badge variant="outline" className="text-red-600 border-red-600">
              -{stats.deletions} deletions
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Equal className="w-4 h-4 text-blue-600" />
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              {stats.modifications} modifications
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Equal className="w-4 h-4 text-gray-600" />
            <Badge variant="outline" className="text-gray-600 border-gray-600">
              {stats.unchanged} unchanged
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
