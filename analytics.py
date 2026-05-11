import pandas as pd
import numpy as np

def calculate_analytics(tasks):
    if not tasks:
        return {
            'total_tasks': 0,
            'completed_tasks': 0,
            'pending_tasks': 0,
            'completion_percentage': 0
        }

    # Convert tasks to list of dicts for Pandas
    task_data = [
        {
            'status': task.status
        } for task in tasks
    ]
    
    df = pd.DataFrame(task_data)
    
    total_tasks = len(df)
    completed_tasks = int(np.sum(df['status'] == 'Completed'))
    pending_tasks = int(np.sum(df['status'] == 'Pending'))
    
    completion_percentage = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    
    return {
        'total_tasks': total_tasks,
        'completed_tasks': completed_tasks,
        'pending_tasks': pending_tasks,
        'completion_percentage': round(completion_percentage, 2)
    }
