#include <stdlib.h>
#include <string.h>


typedef struct Task {
    char title[100];
    char description[256];
    int priority;
    struct Task *next;
} Task;

// Head of the linked list
Task *head = NULL;

// Function to add a task
void add_task(const char *title, const char *description, int priority) {
    Task *new_task = (Task *)malloc(sizeof(Task));
    strncpy(new_task->title, title, sizeof(new_task->title));
    strncpy(new_task->description, description, sizeof(new_task->description));
    new_task->priority = priority;
    new_task->next = head;
    head = new_task;
}

// Function to get the number of tasks
int get_task_count() {
    int count = 0;
    Task *current = head;
    while (current) {
        count++;
        current = current->next;
    }
    return count;
}

// Function to clear all tasks
void clear_tasks() {
    Task *current = head;
    Task *next;
    while (current) {
        next = current->next;
        free(current);
        current = next;
    }
    head = NULL;
}

// Function to initialize WebAssembly module
void init() {
    // This function can be used for initialization if needed
}
