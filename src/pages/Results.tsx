import React, { useEffect, useState } from 'react'
import StorageService from '../sevices/StorageService'
import { Table, Typography } from 'antd'
import gameStore from '../store/game.store'
import { RESULTS_KEY } from '../lib/consts'
import { Link } from 'react-router-dom'
import { RoutePaths } from '../router'

export interface ITableItem {
  key: string
  name: string
  score: number
}

function Results() {
  const [tableData, setTableData] = useState<ITableItem[]>([])

  const loadResults = () => {
    const rawResults = StorageService.get(RESULTS_KEY)
    if (rawResults) {
      const results: Record<string, number> = JSON.parse(rawResults)
      const parsedResults = Object.keys(results).reduce((acc, name) => {
        acc.push({
          key: name,
          name: name,
          score: results[name]
        })

        return acc
      }, [] as ITableItem[])    
      
      setTableData(parsedResults)
    }
  }

  useEffect(loadResults, [])

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    }
  ]

  return (
    <main className="h-full flex-center-column">
      {gameStore.isNewRecord &&
        <Typography.Title level={2} className="color-success">
          Congratulations! This is a new record!
        </Typography.Title>
      }

      <Typography.Title>Points scored - {gameStore.score}</Typography.Title>
      <Typography.Title level={2}>The best results</Typography.Title>

      <Table
        dataSource={tableData}
        columns={tableColumns}
        className="w-10"
      />
      <Link
        className="mt-2"
        to={RoutePaths.HOME}
      >
        Go home
      </Link>
    </main>
  )
} 

export default Results