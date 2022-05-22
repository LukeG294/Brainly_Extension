/* eslint-disable camelcase */

export interface QuestionLogEntry {
    class: 
      | "accepted"
      | "added"
      | "best"
      | "deleted"
      | "edited"
      | "info"
      | "reported";
    date: string;
    descriptions?: {
      subject: string;
      text: string;
    }[];
    owner_id: number;
    text: string;
    time: string;
    type: number;
    user_id: number;
    warn: boolean;
  }
  
  interface Attachment {
    extension: string;
    full: string;
    hash: string;
    id: number;
    size: number;
    thumbnail: string;
    type: string;
  }
  
  interface CommentsData {
    items: {
      can_mark_abuse: boolean;
      content: string;
      created: string;
      deleted: boolean;
      id: number;
      is_marked_abuse: number;
      user_id: number;
    }[];
    count: number;
    last_id: number;
  }
  
  interface Avatar {
    "64": string;
    "100": string;
  }
  
  export interface Task {
    attachments: Attachment[];
    client_type: string;
    content: string;
    created: string;
    first_resp?: string;
    grade_id: number;
    id: number;
    points: {
      ptsForTask: number;
      ptsForResp: number;
      ptsForBest: number;
    };
    responses: number;
    source: string;
    tickets: number;
    user_category: number;
    user_id: number;
    the_best_resp_id?: number;
    subject_id: number;
    settings: {
      [x in keyof {
        "can_comment",
        "can_edit",
        "can_follow",
        "can_mark_abuse",
        "can_moderate",
        "can_unfollow",
        "is_answer_button",
        "is_closed",
        "is_confirmed",
        "is_deleted",
        "is_following",
        "is_marked_abuse"
      }]: boolean;
    };
    comments: CommentsData;
  }
  
  export interface Response {
    approved: {
      date?: string; 
      approver?: {
        id: number;
        nickname: string;
        points: number;
        grade: number;
        gender: number;
        avatars: Avatar;
        content_approved_count: number;
      };
    };
    attachments: Attachment[];
    best: boolean;
    client_type: string;
    comments: CommentsData;
    content: string;
    created: string;
    id: number;
    mark: number;
    marks_count: number;
    points: number;
    settings: {
      [x in keyof {
        "can_comment",
        "can_edit",
        "can_mark_abuse",
        "can_mark_as_best",
        "can_moderate",
        "is_confirmed",
        "is_deleted",
        "is_excellent",
        "is_marked_abuse",
        "is_to_correct"
      }]: boolean;
    };
    source: string;
    task_id: number;
    thanks: number;
    user_best_rank_id?: number;
    user_id: number;
  }
  
  export interface QuestionData {
    task: Task;
    responses: Response[];
  }
  
  export interface User {
    id: number;
    nick: string;
    gender: 1 | 2;
    is_deleted: boolean;
    avatar: string;
    stats: {
      questions: number;
      answers: number;
      comments: number;
    };
    avatars: {
      [x in keyof {64, 100}]?: string;
    };
    ranks: {
      color: string;
      names: string[];
      count: number;
    };
    ranks_ids: number[];
  }
  
  export type CommonResponse<T = void> = {
    success: true;
    users_data?: User[];
    data: T;
    impl?: string;
    protocol?: "28";
    schema?: string;
  };
  
  export type GetConversationResponse = CommonResponse<{
    conversation_id: number;
  }>
  
  export type GetMessagesResponse = CommonResponse<{
    last_id: number;
    conversation: {
      id: number;
      user_id: number;
      created: string;
      recipient_id: number;
      allow_link_from: unknown[];
    };
    messages: {
      id: number;
      conversation_id: number;
      user_id: number;
      created: string;
      content: string;
      is_harmful: boolean;
      new: boolean;
    }[];
  }>;
  
  export type GetQuestionResponse = CommonResponse<{
    task: Task;
    responses: Response[];
    users_data: User[];
  }>
  
  export type GetQuestionLogResponse = CommonResponse<QuestionLogEntry[]>;
  